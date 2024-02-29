import { OIDC_AUTHORITY_URL } from "../utils/utils";
import { user } from "./data";

const SCOPE = process.env.REACT_APP_OIDC_SCOPE;
const CLIENT_ID = process.env.REACT_APP_OIDC_CLIENT_ID;

const USER_KEY = `oidc.user:${OIDC_AUTHORITY_URL}:${CLIENT_ID}`;

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
  sessionStorage.setItem(USER_KEY, JSON.stringify(userObj));
}

// Get response headers for logged in user
export function getLoginHeaders() {
  if (!sessionStorage.getItem(USER_KEY)) {
    return null;
  }
  const sessionObj = {
    id: user.id,
    ext_id: user.ext_id,
    name: user.name,
    title: user.title,
    email: user.email,
    state: "NeedsReregistration",  // the state after login
    csrf: "test123",
    timeout: 3600,
    extends: 7200,
  }
  return { "X-Session": JSON.stringify(sessionObj), "Set-Cookie": "user=" };
}

// Get response headers for re-registered in user
export function getReregistrationHeaders() {
  if (!sessionStorage.getItem(USER_KEY)) {
    return null;
  }
  const sessionObj = {
    id: user.id,
    ext_id: user.ext_id,
    name: user.name,
    title: user.title,
    email: user.email,
    state: "Registered",  // the state after login
    csrf: "test123",
    timeout: 3600,
    extends: 7200,
  }
  return { "X-Session": JSON.stringify(sessionObj), "Set-Cookie": "user=" + btoa(JSON.stringify(sessionObj)) };
}

// Get response headers for re-registered in user
export function getTOTPToken() {
  if (!sessionStorage.getItem(USER_KEY)) {
    return null;
  }
  const sessionObj = {
    id: user.id,
    ext_id: user.ext_id,
    name: user.name,
    title: user.title,
    email: user.email,
    state: "NewTOTPToken",  // the state after login
    csrf: "test123",
    timeout: 3600,
    extends: 7200,
  }
  return { "Set-Cookie": "user=" + btoa(JSON.stringify(sessionObj)) };
}

// Get response headers for correct TOTP in user
export function verifyToken() {
  if (!sessionStorage.getItem(USER_KEY)) {
    return null;
  }
  const sessionObj = {
    id: user.id,
    ext_id: user.ext_id,
    name: user.name,
    title: user.title,
    email: user.email,
    state: "Authenticated",  // the state after login
    csrf: "test123",
    timeout: 3600,
    extends: 7200,
  }
  return { "Set-Cookie": "user=" + btoa(JSON.stringify(sessionObj)) };
}
