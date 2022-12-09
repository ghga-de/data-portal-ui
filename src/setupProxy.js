// Note that this currently works only as a CommonJS module
const { createProxyMiddleware } = require('http-proxy-middleware');

const clientUrl = process.env.REACT_APP_CLIENT_URL;
const basicAuth = process.env.REACT_APP_BASIC_AUTH || null;

const authServiceProxy = {
  target: clientUrl,
  changeOrigin: true,
  secure: true,
  auth: basicAuth,
  logger: console
};

module.exports = function(app) {
  app.use('/api/auth', createProxyMiddleware(authServiceProxy));
};
