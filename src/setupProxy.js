/*
  setupProxy.js

  This file sets up Create React App so that requests against
  the backend are made via a custom proxy configuration.
  This configuration adds basic authentication to backend requests
  and changes the URL of the requests to use the real backend.
*/


// Note that this currently works only as a CommonJS module
const { createProxyMiddleware } = require("http-proxy-middleware");

function urlWithEndSlash(url) {
  const lastCharSlash = url.endsWith("/");
  return lastCharSlash ? url : url + "/"
}

const CLIENT_URL = new URL(urlWithEndSlash(process.env.REACT_APP_CLIENT_URL));
const BASIC_AUTH = process.env.REACT_APP_BASIC_AUTH;

const logOptions = {
  onProxyReq: (proxyReq, req, res) => {
    console.log("\n", req.method, "request to", req.url);
    console.log("with headers", JSON.stringify(proxyReq.getHeaders()));
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log("response status", proxyRes.statusCode, proxyRes.statusMessage);
    console.log("with headers", JSON.stringify(proxyRes.headers));
  },
};

const authServiceProxy = {
  target: CLIENT_URL.href,
  changeOrigin: true,
  secure: true,
  auth: BASIC_AUTH,
  ...logOptions,
};

module.exports = function (app) {
  const useBackend = /ghga/.test(CLIENT_URL.href);
  if (useBackend) app.use("/api", createProxyMiddleware(authServiceProxy));
};
