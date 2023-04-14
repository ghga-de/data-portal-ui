import { rest } from "msw";
import { data } from "./data";
import { setOidcUser } from "./login";

const FAKE_AUTH = true;

const CLIENT_URL = process.env["REACT_APP_CLIENT_URL"];
const OIDC_AUTHORITY_URL = process.env["REACT_APP_OIDC_AUTHORITY_URL"];
const OIDC_CONFIG_URL = OIDC_AUTHORITY_URL + ".well-known/openid-configuration";

// handlers for REST endpoints
export const handlers = [
  // intercept OIDC configuration request and redirect to profile page
  rest.get(OIDC_CONFIG_URL, (req, res, ctx) => {
    if (FAKE_AUTH) {
      setOidcUser();
      return res(
        ctx.json({
          authorization_endpoint: CLIENT_URL + "profile",
        })
      );
    }
  }),
];

// add request handlers for static fake data
Object.keys(data).forEach((endpoint) => {
  let [method, url] = endpoint.split(" ");
  method = method.toLowerCase();
  if (!["get", "post"].includes(method)) {
    console.error("Invalid endpoint in fake data:", endpoint);
    return;
  }
  let result = data[endpoint];
  const resolver = (req, res, ctx) => {
    if (result === undefined) return;
    console.debug("Mocking", method.toUpperCase(), url);
    if (typeof result === "number") {
      res.status(result);
      result = null;
    } else if (method === "post") {
      res.status(result ? 201 : 204);
    }
    return res(result ? ctx.json(result) : null);
  };
  handlers.push(
    method === "post" ? rest.post(url, resolver) : rest.get(url, resolver)
  );
});
