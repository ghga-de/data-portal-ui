import { Log, User as OidcUser, UserManager } from "oidc-client-ts";
import type {
  OidcMetadata,
  OidcStandardClaims,
  UserManagerSettings,
} from "oidc-client-ts";
import jwt_decode from "jwt-decode";
import { fetchJson } from "../utils/utils";

/**
 * Intercace for a full high-level user object.
 * Note that this is different from the low-level OIDC user object,
 * which does not contain the user data from the backend.
 */

export interface User {
  expired: boolean;
  name: string;
  email: string;
  lsId: string;
  id?: string;
  status?: string | null;
  title?: string | null;
  changed?: boolean;
}

export function fullName(user: User): string {
  let { name, title } = user;
  return title ? `${title} ${name}` : name;
}


const USERS_URL = process.env.REACT_APP_SVC_USERS_URL;

/** Authentication service (global object) */

class AuthService {
  userManager: UserManager;
  user: User | null;

  constructor() {
    const settings = this.settings;
    this.userManager = new UserManager(settings);
    this.user = null;

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
    const use_discovery = env("use_discovery").toLowerCase() === "true";
    if (use_discovery) {
      settings.metadataSeed = metadata;
    } else {
      settings.metadata = metadata;
    }

    return settings;
  }

  /**
   * Notify components of changed user.
   */
  private notify(user: User | null): void {
    document.dispatchEvent(new CustomEvent("auth", { detail: user }));
    console.log("New user object:", user);
  }

  /***
   * Set new user and notify components.
   */
  private setUser(user: User | null, notify = true): void {
    if (this.user !== user) {
      this.user = user;
      if (notify) this.notify(user);
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
        console.error("Cannot get user:", error);
        oidcUser = null;
      }
    }
    let user: User | null = null;
    if (oidcUser) {
      let jwtClaims: OidcStandardClaims = {};
      try {
        jwtClaims = jwt_decode<OidcStandardClaims>(oidcUser.access_token);
      } catch (error) {
        console.error("Cannot decode access token:", error);
      }
      const { name, email, sub } = jwtClaims;
      if (name && email && sub) {
        const expired = oidcUser.expired ?? true;
        user = { expired, name, email, lsId: sub };
        try {
          const response = await fetchJson(`${USERS_URL}/${sub}`);
          if (response.status === 200) {
            const userData = await response.json();
            const { id, status, title } = userData;
            user = {
              ...user,
              id,
              status,
              title,
              changed: name !== userData.name || email !== userData.email,
            };
          } else if (response.status !== 404) {
            console.error("Cannot verify user:", response.statusText);
          }
        } catch (error) {
          console.error("Cannot access the server:", error);
        }
      }
    }
    this.setUser(user);
    return user;
  }
}

const authService = new AuthService();

export default authService;
