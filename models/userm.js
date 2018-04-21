const Factory = require("../libs/sequelize_factory");
const sequelize = Factory.sequelize;
const debug = require('debug')('echo:userm')

// get Dao
const User = Factory.getDao("user");
const Order = Factory.getDao("order");
const Wish = Factory.getDao("wish");
const Viewed = Factory.getDao("viewed");

User.sync({force: false}).then(() => {
    debug('sync user success...');
})

Order.sync({force: false}).then(() => {
    debug('sync order success...');
})

Wish.sync({force: false}).then(() => {
    debug('sync wish success...');
})

Viewed.sync({force: false}).then(() => {
    debug('sync Viewed success...');
})

const userm = {

/**
 * 添加用户
 * 
 * @param {json} option 
 * @returns promiss(result.dataValues)
 */
addUser(option) {
    return User.create(option)
},

/**
 * 获取用户
 * 
 * @param {string} username 
 */
getUser(username) {
    return User.findOne({ where: { username } })
},

/**
 * 获取或添加用户
 * 
 * @param {string} username 
 * @param {json} options 
 * @returns 
 */
addCreate(username, options) {
    return User.findOrCreate({
            where: {
                username
            },
            defaults: options
        })
},

/**
 * 获取订单
 * 
 * @param {string} username 
 * @returns 
 */
getOrder(username) {
    return Order.findAll({
        where: {
            username
        }
    })
},

/**
 * 添加订单
 * 
 * @param {json} options 
 * @returns 
 */
addOrder(options) {
    return Order.create(options)
},

/**
 * 获取wish
 * 
 * @param {string} username 
 * @returns 
 */
getWish(username) {
    return Wish.findAll({
        where: {
            username
        }
    })
},

/**
 * 添加想看的电影
 * 
 * @param {json} options 
 * @returns 
 */
addWish(options) {
    return Wish.create(options)
},

/**
 * 获取viewed
 * 
 * @param {string} username 
 * @returns 
 */
getViewed(username) {
    return Viewed.findAll({
        where: {
            username
        }
    })
},

/**
 * 添加看过的电影
 * 
 * @param {json} options 
 * @returns 
 */
addViewed(options) {
    return Viewed.create(options)
}

};

module.exports = userm