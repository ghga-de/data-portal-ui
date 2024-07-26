import { Log, User as OidcUser, UserManager } from "oidc-client-ts";
import type { OidcMetadata, UserManagerSettings } from "oidc-client-ts";
import { fetchJson, AUTH_URL } from "../utils/utils";
import { showMessage } from "../components/messages/usage";
import { createStore, useStore } from "zustand";

export const LOGIN_URL = new URL("rpc/login", AUTH_URL);
export const LOGOUT_URL = new URL("rpc/logout", AUTH_URL);

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
  // undefined = user state not yet determined
  // null = user is not logged in (no user session)
  user: User | null | undefined;
  setUser: (user: User | null) => void;
  loginUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
};

const authStore = createStore<AuthStore>((set) => ({
  user: undefined,
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

    // reset the user to force-fetch it via the session
    // (may have been logged out in another session or due to timeout)
    this.setUser(null);

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

    const issuer = env("authority_url");
    const getEndpoint = (name: string) =>
      new URL(env(name + "_url"), issuer).href;
    const authorization_endpoint = getEndpoint("authorization");
    const token_endpoint = getEndpoint("token");
    const userinfo_endpoint = getEndpoint("userinfo");
    const metadata: Partial<OidcMetadata> = {
      issuer,
      authorization_endpoint,
      token_endpoint,
      userinfo_endpoint,
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
    let response = await fetchJson(LOGIN_URL, "POST", null, headers);

    if (response.status === 401 || response.status === 403) {
      let detail;
      try {
        detail = (await response.json()).detail;
      } catch {
        detail = null;
      }
      if (detail && detail.includes("CSRF")) {
        /* Probably we still have a session cookie,
           try again after logging out and thereby removing the cookie. */
        await this.logout(true);
        response = await fetchJson(LOGIN_URL, "POST", null, headers);
      }
    }

    if (response.status !== 204) {
      const title = "Login failed";
      showMessage({ type: "error", title });
      console.error(title, response.statusText);
      return null;
    }

    const user = this.parseUserFromSession(response.headers.get("X-Session"));
    if (!user) {
      await this.userManager.removeUser();
      showMessage({ type: "error", title: "Login failed" });
    }
    this.setUser(user);
    return user;
  }

  /**
   * Log out (forget the stored user)
   */
  async logout(silent = false): Promise<void> {
    const response = await fetchJson(LOGOUT_URL, "POST");
    await this.userManager.removeUser();
    this.setUser(null);
    if (!silent && response.status !== 204) {
      const title = "Logout failed";
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
  async getUser(force = false): Promise<User | null> {
    let session = sessionStorage.getItem("user");
    if (!session || force) {
      const response = await fetchJson(LOGIN_URL, "POST");
      const status = response.status;
      if (status === 204) {
        session = response.headers.get("X-Session");
      } else if (status === 401 || status === 403) {
        session = null;
        await this.userManager.removeUser();
      } else {
        console.error("Cannot get user session:", response.statusText);
      }
    }
    const user: User | null = this.parseUserFromSession(session);
    if (user?.csrf) sessionStorage.setItem("csrf", user.csrf);
    this.setUser(user);
    return user;
  }

  /**
   * Return the current User session from the session storage.
   */
  getCurrentUser(): User | null {
    const session = sessionStorage.getItem("user");
    const user: User | null = this.parseUserFromSession(session);
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
