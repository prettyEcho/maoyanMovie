'use strict'
module.exports = {
  NODE_ENV: '"production"',
  PHOST: '"http://localhost:3000/proxy"',  // proxy host
  DHOST: '"http://localhost:3000/db/user"', // db host
  FHOST: '"http://localhost:3000/file/user"', // file host
  MODE: '"db"'  // db or file
}
