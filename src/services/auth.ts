import { Log, User as OidcUser, UserManager } from "oidc-client-ts";
import type { OidcMetadata, UserManagerSettings } from "oidc-client-ts";
import { fetchJson, AUTH_URL } from "../utils/utils";
import { showMessage } from "../components/messages/usage";
import { createStore, useStore } from "zustand";

const LOGIN_URL = new URL("rpc/login", AUTH_URL);
const LOGOUT_URL = new URL("rpc/logout", AUTH_URL);

/**
 * Interface for a full high-level user object.
 * Note that this is different from the low-level OIDC user object,
 * which does not contain the user data from the backend.
 */

export type LoginState =
  | "Identified"
  | "NeedsRegistration"
  | "NeedsReRegistration"
  | "Registered"
  | "NeedsTotpToken"
  | "LostTotpToken"
  | "NewTotpToken"
  | "HasTotpToken"
  | "Authenticated";

/** User session interface */
export interface User {
  id?: string;
  ext_id: string;
  name: string;
  title?: string;
  full_name: string;
  email: string;
  state: LoginState;
  role?: string;
  csrf: string;
  timeout?: number;
  extends?: number;
}

/**
 * A store for information about the authenticated user.
 */

type AuthStore = {
  user: User | null; // null = not logged in
  setUser: (user: User | null) => void;
  loginUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
};

const authStore = createStore<AuthStore>((set) => ({
  user: null,
  setUser: (user) => {
    set(() => ({ user }));
  },
  loginUser: () => authService.login(),
  logoutUser: () => authService.logout(),
}));

// for usage in components
export const useAuth = () => useStore(authStore);

/** Authentication service (global object) */

class AuthService {
  userManager: UserManager;

  constructor() {
    const settings = this.settings;
    this.userManager = new UserManager(settings);

    Log.setLogger(console);
    Log.setLevel(Log.INFO); // set to DEBUG for more output
  }

  /**
   * Get the OIDC related settings from the environment
   * and transform them into a UserManagerSettings object.
   */
  private get settings(): UserManagerSettings {
    function env(setting: string): string {
      return process.env[`REACT_APP_OIDC_${setting.toUpperCase()}`] as string;
    }
    const settings: UserManagerSettings = {
      authority: env("authority_url"),
      client_id: env("client_id"),
      redirect_uri: env("redirect_url"),
      response_type: "code",
      scope: env("scope"),
      loadUserInfo: false,
      automaticSilentRenew: false,
    };

    const metadata: Partial<OidcMetadata> = {
      issuer: env("authority_url"),
      authorization_endpoint: env("authorization_url"),
      token_endpoint: env("token_url"),
      userinfo_endpoint: env("userinfo_url"),
    };

    /* If the "use_discovery" flag is set, we use the OIDC discovery mechanism
        to provide the metadata, and only seed it with the configured settings.
        Note that this requires an additional request and will only
        work if the origin header for a registered client is passed. */
    if ((env("use_discovery") ?? "").toLowerCase() === "true") {
      settings.metadataSeed = metadata;
    } else {
      settings.metadata = metadata;
    }

    return settings;
  }

  /***
   * Set new user.
   */
  setUser(user: User | null): void {
    authStore.getState().setUser(user);
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }

  /**
   * Return promise to trigger a redirect of the current window
   * to the authorization endpoint of the OIDC provider.
   */
  login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  /**
   * Return promise to process response from the authorization endpoint.
   * Returns the full user object if the login was successful or null otherwise.
   */
  async callback(): Promise<User | null> {
    const oidcUser = await this.userManager.signinRedirectCallback();

    const sub = oidcUser?.profile.sub;
    const expired = oidcUser.expired ?? true;

    if (!sub || expired) {
      const title = "Cannot get user information";
      showMessage({ type: "error", title });
      console.error(title);
      return null;
    }

    const headers: Record<string, string> = {
      "X-Authorization": "Bearer " + oidcUser.access_token,
    };
    const response = await fetchJson(LOGIN_URL, "POST", null, headers);

    if (response.status !== 204) {
      const title = "Login failed";
      showMessage({ type: "error", title });
      console.error(title, response.statusText);
      return null;
    }

    const user = this.parseUserFromSession(response.headers.get("X-Session"));
    if (!user) {
      showMessage({ type: "error", title: "Login failed" });
    }
    return user;
  }

  /**
   * Log out (forget the stored user)
   */
  async logout(): Promise<void> {
    /* This would be the proper way to do it,
       but LS Login does not support end session endpoint:
         return this.userManager.signoutRedirect();
       This does not work either,
       since LS Login does not provide a revocation endpoint:
         return this.userManager.revokeTokens();
       So we simply remove the user from the store instead.
    */
    const response = await fetchJson(LOGOUT_URL, "GET");
    await this.userManager.removeUser();
    this.setUser(null);
    if (response.status !== 204) {
      const title =  "Logout failed"
      showMessage({ type: "error", title });
      console.error(title, response.statusText);
    }
  }

  /**
   * Return promise to load the OIDC User object for the currently authenticated user.
   */
  getOidcUser(): Promise<OidcUser | null> {
    return this.userManager.getUser();
  }

  /**
   * Return promise to load the OIDC access token for the currently authenticated user.
   */
  async getAccessToken(): Promise<string | null> {
    const user = await this.getOidcUser();
    return user?.access_token || null;
  }

  /**
   * Return promise to load the User session for the currently authenticated user.
   */
  async getUser(): Promise<User | null> {
    let session = sessionStorage.getItem("user");
    if (!session) {
      const response = await fetchJson(LOGIN_URL, "POST");
      const status = response.status;
      if (status === 204) {
        session = response.headers.get("X-Session");
      } else if (status !== 401 && status !== 403) {
        console.error("Cannot get user session:", response.statusText);
      }
    }
    const user: User | null = this.parseUserFromSession(session);
    this.setUser(user);
    return user;
  }

  /**
   * Return the deserialized user session from a JSON-formatted string.
   */
  parseUserFromSession(session: string | null): User | null {
    let user: User | null;
    try {
      user = JSON.parse(session || "null");
      if (!user) return null;
      if (!(user.ext_id && user.name && user.email)) {
        throw new Error("Missing properties in user session");
      }
    } catch (error) {
      console.error("Cannot parse user session:", session, error);
      return null;
    }
    if (!user.full_name) {
      user.full_name = (user.title ? user.title + " " : "") + user.name;
    }
    return user;
  }
}

export const authService = new AuthService();
