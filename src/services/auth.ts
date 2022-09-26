import { Log, User, UserManager } from "oidc-client-ts";
import type {
  OidcMetadata,
  OidcStandardClaims,
  UserManagerSettings,
} from "oidc-client-ts";
import jwt_decode from "jwt-decode";

export interface UserClaims {
  expired: boolean;
  name: string;
  email: string;
}

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
   * Get the OIdC related settings from the environment
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
  private notify(claims: UserClaims | null): void {
    document.dispatchEvent(new CustomEvent("auth", { detail: claims }));
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
   * The result of the promise is the authenticated User.
   */
  callback(): Promise<User> {
    return this.userManager.signinRedirectCallback();
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
    return this.notify(null);
  }

  /**
   * Return promise to load the User object for the currently authenticated user.
   */
  getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  /**
   * Return promise to load a UserClaims object
   * for the currently authenticated user.
   * In addition to the User object it also contains
   * the full name and email address properties.
   * These properties are decoded from the access token.
   * Unfortunately, these are not part of the ID token in LS Login,
   * where we could get them directly via User.profile.
   */
  async getUserClaims(): Promise<UserClaims | null> {
    let user: User | null;
    try {
      user = await this.getUser();
    } catch (error) {
      console.error("Cannot get user:", error);
      this.notify(null);
      return null;
    }
    if (!user) {
      return null;
    }
    try {
      const jwtClaims = jwt_decode<OidcStandardClaims>(user.access_token);
      const { name, email } = jwtClaims;
      if (!name || !email) {
        return null;
      }
      const expired = user.expired ?? true;
      const userClaims = { expired, name, email };
      this.notify(userClaims);
      return userClaims;
    } catch (error) {
      console.error("Cannot decode access token:", error);
      this.notify(null);
      return null;
    }
  }
}

const authService = new AuthService();

export default authService;
