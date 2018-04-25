const express = require('express')
const router = express.Router()
const debug = require('debug')('echo:duser')
const log4js = require('log4js')
const path = require('path')
const {
  addUser,
  getUser,
  addCreate,
  getOrder,
  addOrder,
  getWish,
  addWish,
  getViewed,
  addViewed
} = require('../models/userm')

// log4配置
log4js.configure({
  appenders: {
    dbErr: {
      type: 'file',
      filename: path.resolve(__dirname, '../logs/error.log')
    },
    dbLogin: {
      type: 'file',
      filename: path.resolve(__dirname, '../logs/login.log')
    },
  },
  categories: {
    err: {
      appenders: ['dbErr'],
      level: 'error'
    },
    default: {
      appenders: ['dbLogin'],
      level: 'info'
    }
  },
  pm2: true
});

const eLogger = log4js.getLogger('dbErr');
const lLogger = log4js.getLogger('dbLogin');

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

  addCreate(username, {
    password: password
  }).spread((user, created) => {
    // 注册
    if (created) {
      req.session.username = user.dataValues.username;
      res.cookie('username', user.dataValues.username, { maxAge: 18000000 });

      // log
      lLogger.info(`${username} is register success`);

      res.send({
        code: 1,
        msg: '登录成功'
      })
      return res.end()
    }

    // 登录
    if (user.dataValues.password === password) {
      req.session.username = user.dataValues.username;
      res.cookie('username', user.dataValues.username, { maxAge: 18000000 });  // 5小时

      // log
      lLogger.info(`${username} is login success`);

      res.send({
        code: 1,
        msg: '登录成功'
      })
      return res.end()
    }

    // log
    lLogger.error(`${username} is logining, but password:${password} is error`);

    res.send({
      code: 2,
      msg: '密码错误'
    })
    return res.end()
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
  res.cookie('username', '', { maxAge: 18000000 });

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

  getOrder(username).then(result => {
    if (!result) {
      res.send({
        code: 2,
        data: []
      })
      return res.end()
    }

    // 有数据
    res.send({
      code: 1,
      data: result
    })
    return res.end()
  }).catch(err => {
    debug(err);

    // log
    eLogger.error(`${username} get Order`);

    res.send({
      code: 0,
      msg: '服务器错误'
    })
    return res.end()
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

  addOrder(req.query).then(result => {
    if (result.dataValues) {
      res.send({
        code: 1,
        msg: '添加成功'
      })
      return res.end()
    }

    // log
    eLogger.error(`${username} add Order, data is ${JSON.stringify(req.query)}`);

    res.send({
      code: 2,
      msg: '上传数据不正确'
    })
    return res.end();
  }).catch(err => {
    debug(err);

    // log
    eLogger.error(`${username} add Order, data is ${JSON.stringify(req.query)}`);

    res.send({
      code: 2,
      msg: '上传数据不正确'
    })
    return res.end();
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

  getUser(username).then(result => {
    if (!result) {
      res.send({
        code: 2,
        data: []
      })
      return res.end()
    }

    // 有数据
    res.send({
      code: 2,
      data: result.dataValues.conpon
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

  getUser(username).then(result => {
    if (!result) {
      res.send({
        code: 2,
        data: []
      })
      return res.end()
    }

    // 有数据
    res.send({
      code: 2,
      data: result.dataValues.vip
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

  getWish(username).then(result => {
    if (!result) {
      res.send({
        code: 2,
        data: {}
      })
      return res.end()
    }

    // 有数据
    res.send({
      code: 1,
      data: result.dataValues
    })
    return res.end()
  }).catch(err => {
    debug(err);
    res.send({
      code: 0,
      msg: '服务器错误'
    })
    return res.end()
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

  addWish(req.query).then(result => {
    if (result.dataValues) {
      res.send({
        code: 1,
        msg: '添加成功'
      })
      return res.end()
    }

    // log
    eLogger.error(`${username} add Order, data is ${JSON.stringify(req.query)}`);

    res.send({
      code: 2,
      msg: '上传数据不正确'
    })
    return res.end();
  }).catch(err => {
    debug(err);

    // log
    eLogger.error(`${username} add Order, data is ${JSON.stringify(req.query)}`);

    res.send({
      code: 2,
      msg: '上传数据不正确'
    })
    return res.end();
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

  getViewed(username).then(result => {
    if (!result) {
      res.send({
        code: 2,
        data: {}
      })
      return res.end()
    }

    // 有数据
    res.send({
      code: 1,
      data: result.dataValues
    })
    return res.end()
  }).catch(err => {
    debug(err);
    res.send({
      code: 0,
      msg: '服务器错误'
    })
    return res.end()
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

  addViewed(req.query).then(result => {
    if (result.dataValues) {
      res.send({
        code: 1,
        msg: '添加成功'
      })
      return res.end()
    }

    // log
    eLogger.error(`${username} add Order, data is ${JSON.stringify(req.query)}`);

    res.send({
      code: 2,
      msg: '上传数据不正确'
    })
    return res.end();
  }).catch(err => {
    debug(err);

    // log
    eLogger.error(`${username} add Order, data is ${JSON.stringify(req.query)}`);

    res.send({
      code: 2,
      msg: '上传数据不正确'
    })
    return res.end();
  })
})

module.exports = router
