import { user } from "./data";

const CLIENT_URL = process.env["REACT_APP_CLIENT_URL"];
const ISSUER = (CLIENT_URL || "") + process.env["REACT_APP_OIDC_AUTHORITY_URL"];
const SCOPE = (CLIENT_URL || "") + process.env["REACT_APP_OIDC_SCOPE"];
const CLIENT_ID = (CLIENT_URL || "") + process.env["REACT_APP_OIDC_CLIENT_ID"];

// Simulate login with dummy user via OIDC
export function setOidcUser() {
  const iat = Math.round(new Date() / 1000);
  const exp = iat + 12 * 60 * 60;
  const userObj = {
    id_token: null,
    session_state: null,
    access_token: null,
    token_type: "Bearer",
    scope: SCOPE,
    profile: {
      sub: user.ext_id,
      sid: null,
      scope: SCOPE.split(" "),
      client_id: CLIENT_ID,
      iss: ISSUER,
      iat,
      exp,
      aud: [CLIENT_ID],
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
