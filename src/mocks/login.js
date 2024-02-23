import { OIDC_AUTHORITY_URL } from "../utils/utils";
import { user } from "./data";

const SCOPE = process.env.REACT_APP_OIDC_SCOPE;
const CLIENT_ID = process.env.REACT_APP_OIDC_CLIENT_ID;

// Simulate login with dummy user via OIDC
export function setOidcUser() {
  const iat = Math.round(new Date() / 1000);
  const exp = iat + 12 * 60 * 60;
  const userObj = {
    id_token: null,
    session_state: null,
    access_token: "test123",
    token_type: "Bearer",
    scope: SCOPE.href,
    profile: {
      sub: user.ext_id,
      sid: null,
      scope: SCOPE.split(" "),
      client_id: CLIENT_ID.href,
      iss: OIDC_AUTHORITY_URL.href,
      iat,
      exp,
      aud: [CLIENT_ID.href],
      name: user.name,
      given_name: user.name.split(" ")[0],
      family_name: user.name.split(" ")[1],
      email: user.email,
    },
    expires_at: exp,
  };
  const userKey = `oidc.user:${OIDC_AUTHORITY_URL}:${CLIENT_ID}`;
  sessionStorage.setItem(userKey, JSON.stringify(userObj));
}
