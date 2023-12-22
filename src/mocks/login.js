import { urlWithEndSlash } from "../api/browse";
import { user } from "./data";

const CLIENT_URL = new URL(urlWithEndSlash(process.env.REACT_APP_CLIENT_URL));
const ISSUER = new URL(urlWithEndSlash(process.env.REACT_APP_OIDC_AUTHORITY_URL, CLIENT_URL));
const SCOPE = new URL(urlWithEndSlash(process.env.REACT_APP_OIDC_SCOPE, CLIENT_URL));
const CLIENT_ID = new URL(urlWithEndSlash(process.env.REACT_APP_OIDC_CLIENT_ID, CLIENT_URL));

// Simulate login with dummy user via OIDC
export function setOidcUser() {
  const iat = Math.round(new Date() / 1000);
  const exp = iat + 12 * 60 * 60;
  const userObj = {
    id_token: null,
    session_state: null,
    access_token: null,
    token_type: "Bearer",
    scope: SCOPE.href,
    profile: {
      sub: user.ext_id,
      sid: null,
      scope: SCOPE.split(" "),
      client_id: CLIENT_ID.href,
      iss: ISSUER.href,
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
  const userKey = `oidc.user:${ISSUER}:${CLIENT_ID}`;
  sessionStorage.setItem(userKey, JSON.stringify(userObj));
}
