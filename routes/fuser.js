const express = require('express')
const router = express.Router()
const log4js = require('log4js')
const path = require('path')
const fs = require('fs')
const debug = require('debug')('echo:fuser')
const type = require('../libs/typeof')
const dir = path.resolve(__dirname, '../mock');

// log4配置
log4js.configure({
  appenders: {
    fileErr: {
      type: 'file',
      filename: path.resolve(__dirname, '../logs/error.log')
    },
    fileLogin: {
      type: 'file',
      filename: path.resolve(__dirname, '../logs/login.log')
    },
  },
  categories: {
    err: {
      appenders: ['fileErr'],
      level: 'error'
    },
    default: {
      appenders: ['fileLogin'],
      level: 'info'
    }
  },
  pm2: true
});

const eLogger = log4js.getLogger('fileErr');
const lLogger = log4js.getLogger('fileLogin');

// 注册and登录
router.get('/login', (req, res, next) => {
  const username = req.query.username || '';
  const password = req.query.password || '';

  // 条件判断
  if (!username) {
    res.send({
      code: 0,
      msg: '请输入用户名'
    })
    return res.end()
  }

  if (!password) {
    res.send({
      code: 0,
      msg: '请输入密码'
    })
    return res.end()
  }

  fs.readFile(`${dir}/user.json`, 'utf-8', (err, result) => {
    if (err) {
      debug(err);
      res.send({
        code: 0,
        msg: '登录失败'
      })
      return res.end()
    }

    let data = JSON.parse(result);
    // 登录
    if (data.hasOwnProperty(username)) {
      // 成功
      if (data[username]['password'] === password) {
        req.session.username = username;
        res.cookie('username', username);

        // log
        lLogger.info(`${username} is login success`);

        res.send({
          code: 1,
          msg: '登录成功'
        })
        return res.end()
      }

      // 失败
      lLogger.error(`${username} is logining, but password:${password} is error`);

      res.send({
        code: 2,
        msg: '密码错误'
      })
      return res.end()
    }

    // 注册  
    data[username] = req.query;
    
    fs.writeFile(`${dir}/user.json`, JSON.stringify(data), err => {
      if (err) {
        debug(err);
        res.send({
          code: 0,
          msg: '登录失败'
        })
        return res.end()
      }

      req.session.username = username;
      res.cookie('username', username);

      // log
      lLogger.info(`${username} is register success`);

      res.send({
        code: 1,
        msg: '登录成功'
      })
      return res.end()
    })
  })
})

// 注销
router.get('/logout', (req, res, next) => {
  let username = req.session.username;
  if (!username) {
    res.send({
      code: 0,
      msg: '请先登录'
    })
    return res.end()
  }

  // 删除cookie
  delete req.cookies.username;
  res.cookie('username', '');

  //删除session
  delete req.session.username;

  // log
  lLogger.info(`${username} is logout success`);

  res.send({
    code: 1,
    msg: '注销成功'
  })
  return res.end()
})

// 获取订单
router.get('/getOrder', (req, res, next) => {
  let username = req.session.username || ''

  if (!username) {
    res.send({
      code: 0,
      msg: '请先登录'
    })
    return res.end()
  }

  fs.readFile(`${dir}/order.json`, 'utf-8', (err, result) => {
    if( err ) {
      debug(err);

      // log 
      eLogger.error(`${username} get Order error`);

      res.send({
        code: 0,
        msg: '获取失败'
      })
      return res.end()
    }

    // 解析数据
    let data = JSON.parse(result);

    if( data.hasOwnProperty(username) ) {
      res.send({
        code: 1,
        msg: '获取成功',
        data: JSON.stringify(data[username])
      })
      return res.end()
    }

  })
  
})

// 添加订单
router.get('/addOrder', (req, res, next) => {
  let username = req.session.username || ''

  if (!username) {
    res.send({
      code: 0,
      msg: '请先登录'
    })
    return res.end()
  }

  fs.readFile(`${dir}/order.json`, 'utf-8', (err, result) => {
    if( err ) {
      debug(err);

      // log 
      eLogger.error(`${username} get Order error`);

      res.send({
        code: 0,
        msg: '添加失败'
      })
      return res.end()
    }

    // 解析数据
    let data = JSON.parse(result);

    // 已经存在该用户
    if( data.hasOwnProperty(username) && type.isArray(data[username]) ) {
      data[username].push(req.query);

      // 写入文件
      fs.writeFile(`${dir}/order.json`, Buffer.from(JSON.stringify(data)), err => {
        if( err ) {
          debug(err);
    
          // log 
          eLogger.error(`${username} get Order error, data is ${JSON.stringify(data)}`);
    
          res.send({
            code: 0,
            msg: '添加失败'
          })
          return res.end()
        }
      })

      res.send({
        code: 1,
        msg: '添加成功'
      })
      return res.end()
    }

    // 用户未存在
    data[username] = [req.query];

    // 写入文件
    fs.writeFile(`${dir}/order.json`, JSON.stringify(data), err => {
      if( err ) {
        debug(err);
  
        // log 
        eLogger.error(`${username} get Order error, data is ${JSON.stringify(data)}`);
  
        res.send({
          code: 0,
          msg: '添加失败'
        })
        return res.end()
      }

    })

    res.send({
      code: 1,
      msg: '添加成功'
    })
    return res.end()

  })

})

// 获取优惠券
router.get('/getConpon', (req, res, next) => {
  let username = req.session.username || ''

  if (!username) {
    res.send({
      code: 0,
      msg: '请先登录'
    })
    return res.end()
  }

  fs.readFile(`${dir}/user.json`, 'utf-8', (err, result) => {
    if(err) {
      debug(err);

      // log 
      eLogger.error(`${username} get conpon error`);
      res.send({
        code: 0,
        msg: '获取失败'
      })
      return res.end()
    }

    let data = JSON.parse(result);
    if( !data.hasOwnProperty(username) ) {
      res.send({
        code: 0,
        msg: '请尝试重新登录下'
      })
      return res.end()
    }

    if( 'conpon' in data[username] ) {
      res.send({
        code: 1,
        msg: '获取成功',
        data: data[username]['conpon']
      })

      return res.end()
    }

    res.send({
      code: 1,
      msg: '获取成功',
      data: '[]'
    })

    return res.end()
  })

})

// 获取vip卡
router.get('/getVip', (req, res, next) => {
  let username = req.session.username || ''

  if (!username) {
    res.send({
      code: 0,
      msg: '请先登录'
    })
    return res.end()
  }

  fs.readFile(`${dir}/user.json`, 'utf-8', (err, result) => {
    if(err) {
      debug(err);

      // log 
      eLogger.error(`${username} get VIP error`);
      res.send({
        code: 0,
        msg: '获取失败'
      })
      return res.end()
    }

    let data = JSON.parse(result);
    if( !data.hasOwnProperty(username) ) {
      res.send({
        code: 0,
        msg: '请尝试重新登录下'
      })
      return res.end()
    }

    if( 'vip' in data[username] ) {
      res.send({
        code: 1,
        msg: '获取成功',
        data: data[username]['vip']
      })

      return res.end()
    }

    res.send({
      code: 1,
      msg: '获取成功',
      data: '[]'
    })

    return res.end()
  })
})

// 获取wish电影
router.get('/getWish', (req, res, next) => {
  let username = req.session.username || ''

  if (!username) {
    res.send({
      code: 0,
      msg: '请先登录'
    })
    return res.end()
  }

  fs.readFile(`${dir}/wish.json`, 'utf-8', (err, result) => {
    if( err ) {
      debug(err);

      // log 
      eLogger.error(`${username} get wish films error`);

      res.send({
        code: 0,
        msg: '获取失败'
      })
      return res.end()
    }

    // 解析数据
    let data = JSON.parse(result);

    if( data.hasOwnProperty(username) ) {
      res.send({
        code: 1,
        msg: '获取成功',
        data: JSON.stringify(data[username])
      })
      return res.end()
    }

  })
})

// 添加wish电影
router.get('/addWish', (req, res, next) => {
  let username = req.session.username || ''

  if (!username) {
    res.send({
      code: 0,
      msg: '请先登录'
    })
    return res.end()
  }

  fs.readFile(`${dir}/wish.json`, 'utf-8', (err, result) => {
    if( err ) {
      debug(err);

      // log 
      eLogger.error(`${username} get wish films error`);

      res.send({
        code: 0,
        msg: '添加失败'
      })
      return res.end()
    }

    // 解析数据
    let data = JSON.parse(result);

    // 已经存在该用户
    if( data.hasOwnProperty(username) && type.isArray(data[username]) ) {
      data[username].push(req.query);

      // 写入文件
      fs.writeFile(`${dir}/wish.json`, Buffer.from(JSON.stringify(data)), err => {
        if( err ) {
          debug(err);
    
          // log 
          eLogger.error(`${username} get wish error, data is ${JSON.stringify(data)}`);
    
          res.send({
            code: 0,
            msg: '添加失败'
          })
          return res.end()
        }
      })

      res.send({
        code: 1,
        msg: '添加成功'
      })
      return res.end()
    }

    // 用户未存在
    data[username] = [req.query];

    // 写入文件
    fs.writeFile(`${dir}/wish.json`, JSON.stringify(data), err => {
      if( err ) {
        debug(err);
  
        // log 
        eLogger.error(`${username} get wish films error, data is ${JSON.stringify(data)}`);
  
        res.send({
          code: 0,
          msg: '添加失败'
        })
        return res.end()
      }

    })

    res.send({
      code: 1,
      msg: '添加成功'
    })
    return res.end()

  })
})

// 获取viewed电影
router.get('/getViewed', (req, res, next) => {
  let username = req.session.username || ''

  if (!username) {
    res.send({
      code: 0,
      msg: '请先登录'
    })
    return res.end()
  }

  fs.readFile(`${dir}/wanted.json`, 'utf-8', (err, result) => {
    if( err ) {
      debug(err);

      // log 
      eLogger.error(`${username} get wanted films error`);

      res.send({
        code: 0,
        msg: '获取失败'
      })
      return res.end()
    }

    // 解析数据
    let data = JSON.parse(result);

    if( data.hasOwnProperty(username) ) {
      res.send({
        code: 1,
        msg: '获取成功',
        data: JSON.stringify(data[username])
      })
      return res.end()
    }

  })
})

// 添加viewed电影
router.get('/addViewed', (req, res, next) => {
  let username = req.session.username || ''

  if (!username) {
    res.send({
      code: 0,
      msg: '请先登录'
    })
    return res.end()
  }

  fs.readFile(`${dir}/wanted.json`, 'utf-8', (err, result) => {
    if( err ) {
      debug(err);

      // log 
      eLogger.error(`${username} get wanted films error`);

      res.send({
        code: 0,
        msg: '添加失败'
      })
      return res.end()
    }

    // 解析数据
    let data = JSON.parse(result);

    // 已经存在该用户
    if( data.hasOwnProperty(username) && type.isArray(data[username]) ) {
      data[username].push(req.query);

      // 写入文件
      fs.writeFile(`${dir}/wanted.json`, Buffer.from(JSON.stringify(data)), err => {
        if( err ) {
          debug(err);
    
          // log 
          eLogger.error(`${username} get wanted films error, data is ${JSON.stringify(data)}`);
    
          res.send({
            code: 0,
            msg: '添加失败'
          })
          return res.end()
        }
      })

      res.send({
        code: 1,
        msg: '添加成功'
      })
      return res.end()
    }

    // 用户未存在
    data[username] = [req.query];

    // 写入文件
    fs.writeFile(`${dir}/wanted.json`, JSON.stringify(data), err => {
      if( err ) {
        debug(err);
  
        // log 
        eLogger.error(`${username} get wanted films error, data is ${JSON.stringify(data)}`);
  
        res.send({
          code: 0,
          msg: '添加失败'
        })
        return res.end()
      }

    })

    res.send({
      code: 1,
      msg: '添加成功'
    })
    return res.end()

  })
})

module.exports = router
