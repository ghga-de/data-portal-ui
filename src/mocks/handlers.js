import { rest } from "msw";
import { responses } from "./responses";
import { setOidcUser } from "./login";

const CLIENT_URL = process.env["REACT_APP_CLIENT_URL"];
const OIDC_AUTHORITY_URL = process.env["REACT_APP_OIDC_AUTHORITY_URL"];
const OIDC_CONFIG_URL = OIDC_AUTHORITY_URL + ".well-known/openid-configuration";

const fakeAuth = !!CLIENT_URL.match(/127\.|local/);

// this module converts the responses with static fake data to response handlers

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

function getMatchingParamString(requestParams, responseMap) {
  const paramStrings = Object.keys(responseMap);
  if (responseMap.length < 2) {
    return paramStrings[0];
  }
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
  const resolver = (req, res, ctx) => {
    const paramString = getMatchingParamString(
      req.url.searchParams,
      responseMap
    );
    let response = responseMap[paramString];
    if (response === undefined) {
      console.debug("Not mocking", req.url.href);
      return;
    }
    console.debug("Mocking", req.url.href);
    if (responseMap.length > 1) {
      console.debug("Using mock data for params", paramString);
    }
    let args = [];
    if (typeof response === "number") {
      args.push(ctx.status(response));
      response = null;
    } else if (method === "post" || method === "patch") {
      args.push(ctx.status(response ? 201 : 204));
    }
    if (response) {
      args.push(ctx.json(response));
    }
    return res(...args);
  };
  handlers.push(rest[method].call(rest, url, resolver));
});
