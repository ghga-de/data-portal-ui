/*
  setupProxy.js

  This file sets up Create React App so that requests against
  the backend are made via a custom proxy configuration.
  This configuration adds basic authentication to backend requests
  and changes the URL of the requests to use the real backend.
*/

// Note that this currently works only as a CommonJS module
const { createProxyMiddleware } = require("http-proxy-middleware");

const clientUrl = process.env.REACT_APP_CLIENT_URL;
const basicAuth = process.env.REACT_APP_BASIC_AUTH || null;

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
  target: clientUrl,
  changeOrigin: true,
  secure: true,
  auth: basicAuth,
  ...logOptions,
};

module.exports = function (app) {
  app.use("/api", createProxyMiddleware(authServiceProxy));
};
