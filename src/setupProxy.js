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

/*
  setupProxy.js

  This file sets up Create React App so that requests against
  the backend are made via a custom proxy configuration.
  This configuration adds basic authentication to backend requests
  and changes the URL of the requests to use the real backend.
*/

// Note that this currently works only as a CommonJS module
const { createProxyMiddleware } = require("http-proxy-middleware");

const CLIENT_URL = new URL(urlWithEndSlash(process.env.REACT_APP_CLIENT_URL));
const BASIC_AUTH = process.env.REACT_APP_BASIC_AUTH;
const CHECK_CERT = !process.env.REACT_APP_IGNORE_CERT;

function urlWithEndSlash(url) {
  const lastCharSlash = url.endsWith("/");
  return lastCharSlash ? url : url + "/";
}

function filterHeaders(headers) {
  return Object.entries(headers).reduce((acc, [key, value]) => {
    if (!/ua-platform/.test(key)) return acc;
    acc[key] = value;
    return acc;
  }, {});
}

const logOptions = {
  onProxyReq: (proxyReq, req, res) => {
    console.log("\n", "==>", req.method, req.url);
    console.log(
      "request headers",
      JSON.stringify(filterHeaders(proxyReq.getHeaders()))
    );
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log("\n", "<==", req.method, req.url);
    console.log("status", proxyRes.statusCode, proxyRes.statusMessage);
    console.log("response headers", JSON.stringify(proxyRes.headers));
  },
};

const authServiceProxy = {
  target: CLIENT_URL.href,
  changeOrigin: true,
  secure: CHECK_CERT,
  auth: BASIC_AUTH,
  ...logOptions,
};

module.exports = function (app) {
  const useBackend = /ghga/.test(CLIENT_URL.href);
  if (useBackend) app.use("/api", createProxyMiddleware(authServiceProxy));
};
