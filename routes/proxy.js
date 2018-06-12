// http-proxy-middleware
const proxy = require('http-proxy-middleware')

const options = {
  target: 'https://wx.maoyan.com/',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy/': '/'
  }
}

module.exports = proxy(options)
