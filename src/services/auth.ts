import { Log, User as OidcUser, UserManager } from "oidc-client-ts";
import type { OidcMetadata, UserManagerSettings } from "oidc-client-ts";
import { fetchJson, AUTH_URL, WPS_URL } from "../utils/utils";
import { showMessage } from "../components/messages/usage";
import { createStore, useStore } from "zustand";
import { IVA, IVAStatus, IVAType } from "../models/ivas";

/**
 * Interface for a full high-level user object.
 * Note that this is different from the low-level OIDC user object,
 * which does not contain the user data from the backend.
 */

export enum LoginState {
  Identified,
  NeedsRegistration,
  NeedsReregistration,
  Registered,
  NeedsTOTPToken,
  LostTOTPToken,
  NewTOTPToken,
  HasTOTPToken,
  Authenticated,
}

/** User session interface */
export interface User {
  id?: string;
  ext_id: string;
  name: string;
  title?: string;
  full_name: string;
  email: string;
  state: LoginState;
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

// change user state in session cookie
export const setUserState = (state: LoginState) => {
  let userObj = parseUserCookie();
  if (userObj) {
    userObj.state = LoginState[state];
    document.cookie = document.cookie.replace(
      /((?:^|.*;\s*)user\s*=\s*)([^;]*)(.*$|^.*$)/,
      `$1` + btoa(JSON.stringify(userObj)) + "$3"
    );
  }
};

// Get user IVAs
export const getIVAs = async (userId: string, setUserIVAs: any) => {
  let url = WPS_URL;
  url = new URL(`users/${userId}/ivas`, WPS_URL);
  let method: string = "GET",
    ok: number = 200;
  const response = await fetchJson(url, method).catch(() => null);
  if (response && response.status === ok) {
    try {
      await response.json().then((x: any[]) => {
        function parseIVAStatusAndType(userIVA: any) {
          userIVA.status = IVAStatus[userIVA.status] as unknown as IVAStatus;
          userIVA.type = IVAType[userIVA.type] as unknown as IVAType;
        }
        let IVAs: IVA[] = x;
        IVAs.forEach(parseIVAStatusAndType);
        setUserIVAs(IVAs);
      });
    } catch {
      showMessage({
        type: "error",
        title:
          "Could not obtain user's IVAs. Please try reopening this dialog again.",
      });
    }
    return;
  }
  showMessage({
    type: "error",
    title:
      "Could not obtain user's IVAs. Please try reopening this dialog again.",
  });
  return;
};

//parse user from cookie
const parseUserCookie = () => {
  const userJson = atob(
    document.cookie.replace(/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/, "$1")
  );
  if (userJson) {
    // get session state from session storage
    try {
      return JSON.parse(userJson);
    } catch {
      // preventing issues where the session cookie is malformed and persists because it is not replaced
      document.cookie = `user=;max-age=0`;
      console.error("Cannot parse user from session storage");
    }
  }
  return null;
};

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
  private setUser(user: User | null): void {
    authStore.getState().setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
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
    const response = await fetchJson(
      new URL("rpc/login", AUTH_URL),
      "POST",
      null,
      headers
    );

    if (response.status !== 204) {
      const title = "Login failed";
      showMessage({ type: "error", title });
      console.error(title, response.statusText);
      return null;
    }

    const user = this.parseUserFromResponse(response.headers.get("X-Session"));
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
    document.cookie = `user=;max-age=0`;
    await this.userManager.removeUser();
    this.setUser(null);
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
    let user: User | null = null;
    user = parseUserCookie();
    if (!user) {
      // get session state from backend
      const response = await fetchJson(new URL("rpc/login", AUTH_URL), "POST");
      if (response.status === 204) {
        user = this.parseUserFromResponse(response.headers.get("X-Session"));
      }
    } else user.state = LoginState[user.state] as unknown as LoginState;
    this.setUser(user);
    return user;
  }

  /**
   * Return the deserialized user session from a JSON-formatted string.
   */
  parseUserFromResponse(json: string | null): User | null {
    let user: User | null;
    try {
      user = JSON.parse(json || "null");
      if (
        user &&
        user.ext_id &&
        typeof user.state == "string" &&
        user.state in LoginState
      ) {
        if (user.name && user.title)
          user.full_name = `${user.title} ${user.name}`;
        else user.full_name = user.name;
        user.state = LoginState[user.state] as unknown as LoginState;
      } else {
        user = null;
      }
    } catch {
      user = null;
    }
    if (!user) console.error("Cannot parse user session from backend");
    return user;
  }
}

export const authService = new AuthService();
