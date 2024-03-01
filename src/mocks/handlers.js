import { http, HttpResponse } from "msw";
import { responses } from "./responses";
import { setOidcUser, getLoginHeaders, getReregistrationHeaders } from "./login";
import { CLIENT_URL, OIDC_CONFIG_URL } from "../utils/utils";

const fakeAuth = !!CLIENT_URL.href.match(/127\.|local/);

// this module converts the responses with static fake data to response handlers

// handlers for REST endpoints
export const handlers = [
  // intercept OIDC configuration request and redirect to profile page
  http.get(OIDC_CONFIG_URL.href, () => {
    if (fakeAuth) {
      setOidcUser();
      return HttpResponse.json({
        authorization_endpoint: CLIENT_URL.href + "profile",
      }, { status: 200 });
    }
  }),
  // intercept login request and return session header
  http.post("/api/auth/rpc/login", () => {
    const headers = getLoginHeaders();
    return HttpResponse.json(undefined, headers ? { status: 204, headers } : { status: 401 });
  }),
  // intercept reregistration request and return session header
  http.put("/api/auth/users/:user_id", () => {
    const headers = getReregistrationHeaders();
    return HttpResponse.json(undefined, headers ? { status: 204, headers } : { status: 401 });
  }),
  // intercept totp token request and return header
  http.post("/api/auth/totp-token", () => {
    return HttpResponse.json({ text: "123456789ABCDEFGHI" }, { status: 201 });
  }),
  // intercept totp token request and return header
  http.post("/api/auth/rpc/verify-totp", async ({ request }) => {
    const data = await request.json();
    const token = data["token"];
    return HttpResponse.json(undefined, token === "123456" ? { status: 204 } : { status: 401 });
  }),
];

const groupedResponses = {};

// collect responses with different query parameters for the same endpoint
Object.keys(responses).forEach((endpoint) => {
  let method, url, params;
  [method, url] = endpoint.split(" ");
  method = method.toLowerCase();
  if (!["get", "post", "patch"].includes(method)) {
    console.error("Invalid endpoint in fake data:", endpoint);
    return;
  }
  [url, params] = url.split("?");
  let bareEndpoint = `${method} ${url}`;
  let responseMap = groupedResponses[bareEndpoint];
  if (!responseMap) {
    groupedResponses[bareEndpoint] = responseMap = {};
  }
  responseMap[params || "*"] = responses[endpoint];
});

// find the response with the most matching parameters
async function getMatchingParamString(request, responseMap) {
  const paramStrings = Object.keys(responseMap);
  if (responseMap.length < 2) {
    return paramStrings[0];
  }
  // combine parameters from query string and body
  const requestParams = new URL(request.url).searchParams;
  const method = request.method.toLowerCase();
  if (method === "post" || method === "patch") {
    const bodyParams = await request.json();
    Object.entries(bodyParams).forEach(
      (key, value) => requestParams.set(key, value));
  }
  // find the response with the most matching parameters
  let bestParamString = null;
  let bestNumParams = 0;
  let bestStringLen = 0;
  Object.keys(responseMap).forEach((paramString) => {
    const params = new URLSearchParams(paramString);
    const numParams = Array.from(requestParams.keys()).reduce(
      (num, param) =>
        num + (params.get(param) === requestParams.get(param) ? 1 : 0),
      0
    );
    if (
      bestParamString === null ||
      numParams > bestNumParams ||
      (numParams === bestNumParams && paramString.length < bestStringLen)
    ) {
      bestParamString = paramString;
      bestNumParams = numParams;
      bestStringLen = paramString.length;
    }
  });
  return bestParamString;
}

// create request handlers for the different endpoints
Object.keys(groupedResponses).forEach((endpoint) => {
  let method, url;
  [method, url] = endpoint.split(" ");
  const responseMap = groupedResponses[endpoint];
  const resolver = async (info) => {
    const paramString = await getMatchingParamString(info.request, responseMap);
    let response = responseMap[paramString];
    if (response === undefined) {
      console.debug("Not mocking", url);
      return;
    }
    if (responseMap.length > 1) {
      console.debug("Using mock data for params", paramString);
    }
    let status = 200;
    if (typeof response === "number") {
      status = response;
      response = undefined;
    } else if (method === "post" || method === "patch") {
      status = response ? 201 : 204;
    }
    return HttpResponse.json(response || undefined, { status });
  };
  handlers.push(http[method].call(http, url, resolver));
});
