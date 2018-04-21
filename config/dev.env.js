'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PHOST: '"http://localhost:3000/proxy"',  // proxy host
  DHOST: '"http://localhost:3000/db/user"', // db host
  FHOST: '"http://localhost:3000/file/user"', // file host
  MODE: '"db"'  // db or file
})
