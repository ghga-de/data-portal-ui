import { rest } from "msw";
import { data } from "./data";
import { setOidcUser } from "./login";
import { getAllAccessRequests, setStatus } from "./accessRequest";

const CLIENT_URL = process.env["REACT_APP_CLIENT_URL"];
const OIDC_AUTHORITY_URL = process.env["REACT_APP_OIDC_AUTHORITY_URL"];
const OIDC_CONFIG_URL = OIDC_AUTHORITY_URL + ".well-known/openid-configuration";

const fakeAuth = !!CLIENT_URL.match(/127\.|local/);

// handlers for REST endpoints
export const handlers = [
  // intercept OIDC configuration request and redirect to profile page
  rest.get(OIDC_CONFIG_URL, (req, res, ctx) => {
    if (fakeAuth) {
      setOidcUser();
      return res(
        ctx.json({
          authorization_endpoint: CLIENT_URL + "profile",
        })
      );
    }
  }),

  // Intercept GET all access requests
  rest.get("/api/access-requests", (req, res, ctx) => {
    return res(ctx.json(getAllAccessRequests()));
  }),

  // Intercept PATCH of an access request
  rest.patch("/api/access-requests/:accessRequestId", (req, res, ctx) => {
    const { accessRequestId } = req.params;
    req.json().then((x) => {
      switch (x.status) {
        case "pending":
          setStatus(accessRequestId, "pending");
          break;
        case "allowed":
          setStatus(accessRequestId, "allowed");
          break;
        case "denied":
          setStatus(accessRequestId, "denied");
          break;
        default:
          return res(ctx.status(400));
      }
    });
    const accessRequests = JSON.stringify(getAllAccessRequests());
    return res(ctx.status(200), ctx.body(accessRequests));
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
    let args = [];
    if (typeof result === "number") {
      args.push(ctx.status(result));
      result = null;
    } else if (method === "post") {
      args.push(ctx.status(result ? 201 : 204));
    }
    if (result) {
      args.push(ctx.json(result));
    }
    return res(...args);
  };
  handlers.push(
    method === "post"
      ? rest.post(url, resolver)
      : method === "patch"
      ? rest.patch(url, resolver)
      : rest.get(url, resolver)
  );
});
