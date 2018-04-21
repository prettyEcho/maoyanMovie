/**
 * Sequelize 带连接池的配置DB
 */
const config = require('config')
const dbConfig = config.get('dbConfig')
const debug = require('debug')('echo:orm')

module.exports =  {
    database: dbConfig.database, // 使用哪个数据库
    username: dbConfig.username, // 用户名
    password: dbConfig.password, // 口令
    option: {
        operatorsAliases: false, //http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
        host: dbConfig.host, // 主机名
        port: dbConfig.port, // 端口号，MySQL默认3306
        logging: false, //a function or false
        dialect: 'mysql', //方言
        define: { //Default options for model definitions
            underscored: true,
            freezeTableName: false,
            charset: 'utf8',
            dialectOptions: {
              collate: 'utf8_general_ci'
            },
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            idle: 3000
        }
    }
 }

 