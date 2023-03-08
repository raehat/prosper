const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://stacks-node-api.testnet.stacks.co',
      changeOrigin: true,
      secure: false,
    })
  );
};
