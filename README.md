# maoyan-movie

> A full-stack project base on express and vue

### 项目设计

该项目是一个完全前后端分离的实践，模仿了猫眼小程序移动应用，整个项目整合到一个项目目录下。
涉及到前后端结构设计、两套环境配置中心、代理请求猫眼接口、跨域请求该项目后端接口、后端接口分读本地文件(mode: file)和读数据库(mode: db)两种模式、日志记录、pm2的配置。

* 前端技术栈：vue2+vue-router+vuex+vux+ajax.js(自己封装的promiss版ajax)
* 后端技术栈：express+session+cookie+sequelize+mysql2+pm2

### 项目变更

该项目和原猫眼移动应用不是完全相同，主要变化如下：

1. 前端请求的电影相关数据和原项目相同
2. 用户相关的功能，完全是新设计的逻辑，旨在实现一个前后端兼备的项目
3. 新设计的后端功能分读本地文件和读数据库两种模式，考虑到有些同学无本地数据库
4. 支付相关的功能页面并未涉及

### 环境配置中心(./config)

* 前端
    + 开发环境（./config/dev.env.js)
    + 正式环境（./config/prod.env.js)
* 后端
    + 开发环境（./config/dev.json)
    + 正式环境（./config/prod.json)
* 文件模式和数据库模式选择
    + 在配种文件中配置MODE: file / db (建议有本地数据库的选择数据库模式)

### 功能

* 电影

- [x] 热映电影
- [x] 待映电影
- [] 影片详情 
- [x] 添加喜欢影片 🐶 
- [x] 添加已看影片 🐶 
- [x] 地址定位 🐶
- [x] 选择城市
- [x] 电影搜索 

* 电影院

- [] 电影院列表 
- [] 电影院搜索
- [] 电影院详情

* 我的

- [x] 登录 🐶
- [x] 注册 🐶
- [x] 我的订单 🐶 （购票添加到我的订单）
- [x] 优惠券 🐶
- [x] 影院会员卡 🐶
- [x] 想看的电影 🐶
- [x] 看过的电影 🐶

* 其他

- [x] 历史返回

**注：带小狗标志的为我自增的后端功能**

### 项目启动

```
# fork项目到本地
git clone git@github.com:prettyEcho/maoyanMovie.git

# 安装依赖
npm install

# 启动前端项目(开发模式)
npm run dev:front

# 启动后端项目(开发模式)
npm run dev:end

# 前端项目打包
npm run dev

# 项目部署
pm2 deploy ecosystem.config.js production setup

# 项目更新
pm2 deploy ecosystem.config.js production update
```

### 截图展示

<img src="https://github.com/prettyEcho/maoyanMovie/blob/master/src/images/maoyan1.gif" width="350" height="619"/> <img src="https://github.com/prettyEcho/maoyanMovie/blob/master/src/images/maoyan2.gif" width="350" height="619"/> 

<img src="https://github.com/prettyEcho/maoyanMovie/blob/master/src/images/maoyan3.gif" width="350" height="619"/> <img src="https://github.com/prettyEcho/maoyanMovie/blob/master/src/images/maoyan4.gif" width="350" height="619"/> 

