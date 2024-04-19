import { OIDC_AUTHORITY_URL } from "../utils/utils";
import { user } from "./data";

const SCOPE = process.env.REACT_APP_OIDC_SCOPE;
const CLIENT_ID = process.env.REACT_APP_OIDC_CLIENT_ID;

const OIDC_USER_KEY = `oidc.user:${OIDC_AUTHORITY_URL}:${CLIENT_ID}`;
const USER_KEY = 'user';

// The following state should be set after login
// (set to "NeedsRegistration" to test registration flow)
const LOGIN_STATE = "Authenticated"

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
    role: user.role,
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
  sessionStorage.setItem(OIDC_USER_KEY, JSON.stringify(userObj));
  sessionStorage.removeItem(USER_KEY);
}

// Remove the dummy user set for OIDC
export function clearOidcUser() {
  sessionStorage.removeItem(OIDC_USER_KEY);
}

// Remove the session cookie (to mock logout properly)
export function clearSessionCookie() {
  document.cookie = 'session=';
}

// Check if the user has a session cookie (to mock login properly)
function hasSessionCookie() {
  const cookie = document.cookie;
  return cookie && cookie.includes("session=test-session");
}

// Get response headers for logged in user
export function getLoginHeaders() {
  if (!hasSessionCookie() && !sessionStorage.getItem(OIDC_USER_KEY)) {
    return null;
  }
  const sessionObj = {
    id: user.id,
    ext_id: user.ext_id,
    name: user.name,
    title: user.title,
    email: user.email,
    role: user.role,
    state: LOGIN_STATE, // the state after login
    csrf: "mock-csrf-token",
    timeout: 3600,
    extends: 7200,
  };
  return {
    "X-Session": JSON.stringify(sessionObj),
    // this should be actually HttpOnly, but this doesn't work with MSW
    "Set-Cookie": "session=test-session; SameSite=lax"
  };
}
