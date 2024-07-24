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
