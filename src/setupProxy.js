const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      // target: 'http://localhost:8000',
      target: 'http://ec2-13-51-169-65.eu-north-1.compute.amazonaws.com',
      pathRewrite: {
        '^/api': '',
      },
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/media', {
      target: 'http://ec2-13-51-169-65.eu-north-1.compute.amazonaws.com',
      changeOrigin: true,
    })
  );
};