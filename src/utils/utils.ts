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

import { showMessage } from "../components/messages/usage";
import { authService, LOGIN_URL, LOGOUT_URL } from "../services/auth";

/**
 * Checks and cleans up URL if last character is or is not forward slash
 * Duplicate of utils version because of infinite recursion error, needs refactoring
 * @param url - String of URL
 * @param endSlash - whether we want to have an end slash or not
 * @returns URL as specified
 */
export const urlWithEndSlash = (url: string) =>
  url.endsWith("/") ? url : url + "/";

const getUrl = (path: string) => new URL(path, CLIENT_URL);

const getConfiguredUrl = (varName: string) =>
  getUrl(urlWithEndSlash(process.env[`REACT_APP_${varName}`]!));

export const CLIENT_URL = new URL(
  urlWithEndSlash(process.env.REACT_APP_CLIENT_URL!)
);

export const AUTH_URL = getConfiguredUrl("AUTH_URL");
export const ARS_URL = getConfiguredUrl("ARS_URL");
export const MASS_URL = getConfiguredUrl("MASS_URL");
export const METLDATA_URL = getConfiguredUrl("METLDATA_URL");
export const WPS_URL = getConfiguredUrl("WPS_URL");

export const OIDC_AUTHORITY_URL = getConfiguredUrl("OIDC_AUTHORITY_URL");
export const OIDC_CONFIG_PATH = ".well-known/openid-configuration";
export const OIDC_CONFIG_URL = new URL(OIDC_CONFIG_PATH, OIDC_AUTHORITY_URL);

/**
 * Scroll page smoothly to 0 pixels below the top
 * @returns Nothing
 */
export const scrollUp = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/**
 * Convert byte size into a human-readable format
 * @param bytes - Bytes as number
 * @returns Human readable size string, e.g. 5 kB
 */
export const parseBytes = (bytes: number) => {
  const prefixes = [
    " B",
    " kB",
    " MB",
    " GB",
    " TB",
    " PB",
    " EB",
    " ZB",
    " YB",
  ];
  let parsedBytes = prefixes.flatMap((prefix, index) => {
    let calculatedVal = bytes / Math.pow(1000, index);
    if (calculatedVal < 1000 && calculatedVal >= 0.1) {
      return String(Math.round(calculatedVal * 100) / 100) + prefix;
    } else return null;
  });
  var returnValue = parsedBytes.find((parsing) => parsing !== null);
  if (returnValue === undefined) returnValue = String(bytes) + prefixes[0];
  return returnValue;
};

/**
 * Import all files in a given folder.
 * @param r - Is expected to be a webpack require.context function.
 * @returns An array containing the exported content of each file in the folder.
 */
export const importAllFilesFromFolder = (r: any) => {
  return r.keys().map(r);
};

/**
 * Perform an HTTP request using fetch().
 * @param url - URL string to send the request
 * @param method - HTTP method for request
 * @param payload - Request body, if any.
 * @param additionalHeaders - Custom request headers, if any.
 * @returns Promise resolves to the response of the HTTP request.
 */
/** Fetch JSON data with proper headers */
export const fetchJson = async (
  url: string | URL,
  method: string = "GET",
  payload?: any,
  additionalHeaders?: Record<string, string>
): Promise<Response> => {
  const headers: HeadersInit = {
    Accept: "application/json",
  };
  if (payload) {
    headers["Content-Type"] = "application/json";
  }
  if (CLIENT_URL) {
    headers["Origin"] = CLIENT_URL.hostname;
  }
  if (method.match(/^POST|PUT|PATCH|DELETE$/)) {
    const user = authService.getCurrentUser();
    const csrf = user?.csrf || sessionStorage.getItem("csrf");
    if (csrf) {
      headers["X-CSRF-Token"] = csrf;
    }
  }
  if (additionalHeaders) Object.assign(headers, additionalHeaders);
  const body = payload ? JSON.stringify(payload) : undefined;
  try {
    const response = await fetch(url, { method, headers, body });
    if (
      (response.status === 401 || response.status === 403) &&
      !(url === LOGIN_URL || url === LOGOUT_URL)
    ) {
      // authentication error: check if session has expired
      if (authService.getCurrentUser() && !(await authService.getUser(true))) {
        showMessage({
          type: "error",
          title: "You are not logged in anymore.",
        });
        console.warn("User session has expired.");
      }
    }
    return response;
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 500,
      statusText: "Cannot fetch response: " + error,
    });
  }
};

/**
 * Transpose a table of data for HTML display.
 * @param data - Two arrays of strings representing rows and columns.
 * @returns Transposed version of data.
 */
export const transposeTableForHTML = (data: any[]) => {
  if (data.length > 0 && data[0]) {
    const rows = data.length,
      cols = data[0].length;
    const grid = [];
    for (let j = 0; j < cols; j++) {
      grid[j] = Array(rows);
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[j][i] = data[i][j];
      }
    }
    return grid;
  }
  return [];
};

export const FILTER_MIN_YEAR = 2000;
export const FILTER_MAX_YEAR = 2199;
export const FILTER_MIN_ISO: string = FILTER_MIN_YEAR + "-01-01T00:00:00.000Z";
export const FILTER_MAX_ISO: string = FILTER_MAX_YEAR + "-12-31T23:59:59.999Z";

export function parseDate(value: string, force: boolean = false) {
  if (
    Date.parse(value) < Date.parse(FILTER_MIN_ISO) &&
    (Date.parse(value) > 999 || force)
  )
    value =
      FILTER_MIN_YEAR.toString() + "-" + value.split("-").slice(1).join("-");

  if (Date.parse(value) > Date.parse(FILTER_MAX_ISO))
    value =
      FILTER_MAX_YEAR.toString() + "-" + value.split("-").slice(1).join("-");

  return value;
}

export const STATIC_PAGE_MAIN_DIV_CLASSES = "mx-auto px-2 px-md-5 my-5";
export const STATIC_PAGE_IMG_ROW_CLASSES =
  "text-center w-100 mx-0 px-0 mb-4 mb-sm-5 justify-content-center";
export const STATIC_PAGE_IMG_COL_CLASSES =
  "mx-0 px-0 col-md-11 col-lg-10 col-xl-8 col-xxl-6";
