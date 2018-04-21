//获取Sequelize单一实例
const Factory = require('../libs/sequelize_factory');
const sequelize = Factory.sequelize;
const Sequelize = Factory.Sequelize;

/**
 * 表结构对应../conf/user.sql
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("order", {
    username: {
      type: Sequelize.STRING(25),
      field: 'username'
    },
    name: {
      type: Sequelize.STRING(25),
      field: 'name'
    },
    cat: {
      type: Sequelize.STRING(255),
      field: 'cat'
    },
    desc: {
      type: Sequelize.STRING(255),
      field: 'desc'
    },
    showInfo: {
      type: Sequelize.TEXT,
      field: 'showInfo'
    },
    img: {
      type: Sequelize.STRING(255),
      field: 'img'
    },
    preSale: {
      type: Sequelize.STRING(10),
      field: 'preSale'
    },
    wish: {
      type: Sequelize.STRING(25),
      field: 'wish'
    },
    mk: {
      type: Sequelize.STRING(10),
      field: 'mk'
    }
  }, {
    //不添加创建、更新时间戳
    timestamps: false,
    //使用下划线命名法
    underscored: true,
    //不自动修改表名
    freezeTableName: true,
    // define the table's name
    tableName: 'order'
  })
};