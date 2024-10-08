// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { http, HttpResponse } from "msw";
import { responses } from "./responses";
import {
  setOidcUser,
  getLoginHeaders,
  clearSessionCookie,
  clearOidcUser,
  session,
} from "./login";
import { AUTH_URL, CLIENT_URL, OIDC_CONFIG_URL } from "../utils/utils";
import { user } from "./data";

const fakeAuth = !!CLIENT_URL.href.match(/127\.|local/);

const LOGIN_URL = new URL("rpc/login", AUTH_URL);
const LOGOUT_URL = new URL("rpc/logout", AUTH_URL);
const TOTP_VALIDATON_URL = new URL("rpc/verify-totp", AUTH_URL);
const USERS_URL = new URL("users", AUTH_URL);

const VALID_TOTP_CODE = "123456";

// this module converts the responses with static fake data to response handlers

// handlers for REST endpoints
export const handlers = [
  // intercept OIDC configuration request and redirect authorization to profile page
  http.get(OIDC_CONFIG_URL.href, () => {
    if (fakeAuth) {
      setOidcUser();
      setTimeout(
        () => (window.location.href = CLIENT_URL.href + "profile"),
        500
      );
      return HttpResponse.json(
        {
          authorization_endpoint: CLIENT_URL.href,
        },
        { status: 200 }
      );
    }
  }),
  // intercept login request and return session header
  http.post(LOGIN_URL.href, () => {
    const headers = getLoginHeaders();
    return HttpResponse.json(
      undefined,
      headers ? { status: 204, headers } : { status: 401 }
    );
  }),
  // intercept logout request
  http.post(LOGOUT_URL.href, () => {
    clearSessionCookie();
    clearOidcUser();
    return HttpResponse.json(undefined, { status: 204 });
  }),
  // intercept TOTP verification request
  http.post(TOTP_VALIDATON_URL.href, ({ request }) => {
    // the code is passed in the X-Authorization header in this case
    let token = request.headers.get("X-Authorization");
    if (token.startsWith("Bearer TOTP:")) token = token.substring(12);
    const status = token === VALID_TOTP_CODE ? 204 : 401;
    return HttpResponse.json(undefined, { status });
  }),
  // intercept user creation request
  http.post(USERS_URL.href, () => {
    session.id = user.id;
    session.state = "Registered";
    return HttpResponse.json(undefined, { status: 201 });
  }),
];

const groupedResponses = {};

// collect responses with different query parameters for the same endpoint
Object.keys(responses).forEach((endpoint) => {
  let method, url, params;
  [method, url] = endpoint.split(" ");
  method = method.toLowerCase();
  if (!/^(get|post|patch|put|delete)$/.test(method)) {
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
  if (/post|patch|put|delete/.test(method)) {
    try {
      const bodyParams = await request.json();
      Object.entries(bodyParams).forEach(([key, value]) => {
        requestParams.set(key, value);
      });
    } catch {}
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
    } else if (/post|patch|put|delete/.test(method)) {
      status = response ? (response.hits ? 200 : 201) : 204;
    }
    return HttpResponse.json(response || undefined, { status });
  };
  handlers.push(http[method].call(http, url, resolver));
});
