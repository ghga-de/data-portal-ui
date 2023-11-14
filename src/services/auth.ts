import { Log, User as OidcUser, UserManager } from "oidc-client-ts";
import type { OidcMetadata, UserManagerSettings } from "oidc-client-ts";
import { fetchJson } from "../utils/utils";
import { showMessage } from "../components/messages/usage";
import { createStore, useStore } from "zustand";

const USERS_URL = process.env.REACT_APP_USERS_URL;

/**
 * Interface for a full high-level user object.
 * Note that this is different from the low-level OIDC user object,
 * which does not contain the user data from the backend.
 */

export interface User {
  expired: boolean;
  name: string;
  fullName: string;
  email: string;
  extId: string;
  id?: string;
  status?: string | null;
  title?: string | null;
  changed?: boolean;
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
      loadUserInfo: true,
      automaticSilentRenew: true,
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
    return await this.getUser(oidcUser);
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
   * Return promise to load a User object
   * for the currently authenticated user.
   * In addition to the User object it also contains
   * the full name and email address properties.
   * These properties are decoded from the access token.
   * Unfortunately, these are not part of the ID token in LS Login,
   * where we could get them directly via User.profile.
   */
  async getUser(oidcUser?: OidcUser | null): Promise<User | null> {
    if (!oidcUser) {
      try {
        oidcUser = await this.getOidcUser();
      } catch (error) {
        const title = "Cannot get user";
        showMessage({ type: "error", title });
        console.error(title, error);
        oidcUser = null;
      }
    }
    let user: User | null = null;
    if (oidcUser) {
      const { name, email, sub } = oidcUser.profile;
      if (name && email && sub) {
        const expired = oidcUser.expired ?? true;
        let fullName = name;
        user = {
          expired,
          name,
          fullName: name,
          email,
          extId: sub,
        };
        try {
          const response = await fetchJson(`${USERS_URL}/${sub}`);
          if (response.status === 200) {
            const userData = await response.json();
            const { id, status, title } = userData;
            if (title) fullName = `${title} ${fullName}`;
            user = {
              ...user,
              id,
              status,
              title,
              fullName,
              changed: name !== userData.name || email !== userData.email,
            };
          } else if (response.status !== 404) {
            const title = "Cannot verify user";
            showMessage({ type: "error", title });
            console.error(title, response.statusText);
          }
        } catch (error) {
          const title = "Cannot access the server";
          showMessage({ type: "error", title });
          console.error(title, error);
        }
      } else {
        const title = "Cannot get required user properties";
        showMessage({ type: "error", title });
        console.error(title);
      }
    }
    this.setUser(user);
    return user;
  }
}

export const authService = new AuthService();
