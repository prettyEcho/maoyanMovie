
<template>
  <section id="detail">
    <!-- 电影详情header start -->
    <section class="detail-header">
      <img :src="detail.img | avatar" :alt="detail.nm" class="detail-header-img">
      <dt class="detail-header-info">
        <dl>
          <dd class="detail-header-info-nm">{{detail.nm}}</dd>
          <dd class="detail-header-info-enm">{{detail.enm}}</dd>
          <dd class="detail-header-info-sc">
            <rater v-model="detail.sc" disabled active-color="#FF9900" :font-size="16" :margin="0" style="margin-right: 10px"></rater>
            {{detail.sc}}
          </dd>
          <dd class="detail-header-info-commet">({{detail.snum|format}}人评)</dd>
          <dd class="detail-header-info-cat">{{detail.cat}}</dd>
          <dd class="detail-header-info-src">{{detail.src}} / {{detail.dur}}</dd>
          <dd class="detail-header-info-pubDesc">{{detail.pubDesc}}</dd>
        </dl>
      </dt>
      <!-- 添加我的喜欢start -->
      <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="添加成功" :position="position"></toast>
      <!-- 添加我的喜欢end -->
      <button class="detail-header-btn" @click="showPosition">
        <span class="detail-header-btn-wish">想看</span>
      </button>
      <button class="detail-header-btn">
        <span class="detail-header-btn-score">评分</span>
      </button>
    </section>
    <!-- 电影详情header end -->
    <!-- 电影简介 start -->
    <section class="detail-dra">
      <div :class="[draClass, 'detail-dra-content']">{{detail.dra}}</div>
      <div class="detail-dra-control" @click="changeDra">
        <span v-if="draControl">
          <x-icon type="ios-arrow-down" size="16"></x-icon>
        </span>
        <span v-else>
          <x-icon type="ios-arrow-up" size="16"></x-icon>
        </span>
      </div>
    </section>
    <!-- 电影简介 end -->
    <!-- 电影详情演员表 start -->
    <section class="detail-celebrities">
      <h5 class="detail-celebrities-header">演职人员</h5>
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in celebrityList" :key="item.id">
          <img class="detail-celebrities-avatar" :src="item.avatar | avatar" :alt="item.cnm" :data-roles="item.roles" :data-enm="item.enm">
          <div class="detail-celebrities-cnm">{{item.cnm}}</div>
          <div class="detail-celebrities-role">{{item.roles}}</div>
        </swiper-slide>
      </swiper>
    </section>
    <!-- 电影详情演员表 end -->
    <!-- 电影详情票房 start -->
    <section class="detail-boxOffice">
      <h5 class="detail-boxOffice-header">票房</h5>
      <ul class="detail-boxOffice-wrap">
        <li class="detail-boxOffice-item">
          <span class="detail-boxOffice-num">{{box.showst}}</span>
          <span class="detail-boxOffice-desc">昨日票房排行</span>
        </li>
        <li class="detail-boxOffice-item">
          <span class="detail-boxOffice-num">{{box.firstWeekBox}}</span>
          <span class="detail-boxOffice-desc">首周票房(万)</span>
        </li>
        <li class="detail-boxOffice-item">
          <span class="detail-boxOffice-num">{{box.sumBox}}</span>
          <span class="detail-boxOffice-desc">累计票房(万)</span>
        </li>
      </ul>
    </section>
    <!-- 电影详情票房 end -->
    <!-- 电影详情剧照 start -->
    <section class="detail-stills">
      <h5 class="detail-stills-header">视频和剧照</h5>
      <swiper :options="stillsOption">
        <swiper-slide v-for="item in stills" :key="item.id">
          <img class="detail-stills-photo" :src="item | avatar">
        </swiper-slide>
      </swiper>
    </section>
    <!-- 电影详情剧照 end -->
    <!-- 电影详情评论 start -->
    <section class="detail-comment">
      <h5 class="detail-comment-header">观众评论</h5>
      <div class="detail-comment-content" v-for="comment in comments" :key="comment.id">
        <img class="detail-comment-avatar" :src="comment.avatarurl" alt="">
        <div class="detail-comment-item">
          <h6 class="detail-comment-name">{{comment.nick}}</h6>
          <rater v-model="comment.score" disabled active-color="#FF9900" :font-size="12" :margin="2"></rater>
          <p class="detail-comment-detail">{{comment.content}}</p>
          <span class="detail-comment-date">{{comment.time | time}}</span>
          <span class="detail-comment-approve">{{comment.approve}}</span>
        </div>
      </div>
    </section>
    <!-- 电影详情评论 end -->
    <!-- 演员dialog start -->
    <div v-transfer-dom>
      <x-dialog v-model="showToast">
        <div class="toast-cnm">{{info.cnm}}</div>
        <div class="toast-enm">{{info.enm}}</div>
        <div class="toast-roles">饰：{{info.roles}}</div>
      </x-dialog>
    </div>
    <!-- 演员dialog end -->
  </section>
</template>

<script>

import { GetCelebrities, GetDetail, GetComments, GetMBox } from '../../service/getData'
import { Rater, Toast, XDialog, TransferDomDirective as TransferDom } from 'vux'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import 'swiper/dist/css/swiper.css'
import { mapMutations } from 'vuex'

export default {
  name: 'movie_detail',
  data () {
    return {
      detail: {}, // 电影详情对象
      showPositionValue: false,
      position: 'middle',
      showToast: false, // 演员简介弹窗
      stillsOption: {
        direction: 'horizontal',
        slidesPerView: 3,
        spaceBetween: 6
      },
      swiperOption: {
        direction: 'horizontal',
        slidesPerView: 5,
        spaceBetween: 6,
        on: {
          touchEnd: (event) => {
            // 数据赋值
            this.info.cnm = event.target.alt
            this.info.enm = event.target.dataset.enm
            this.info.roles = event.target.dataset.roles
            this.showToast = true
            // 绑定事件
            let oDialog = document.querySelector('.vux-x-dialog')
            let handler = () => {
              if (this.showToast) {
                this.showToast = false
              }
            }
            oDialog.addEventListener('touchend', handler)
          }
        }
      },
      celebrityList: [], // 演员列表
      stills: [], // 剧照列表
      comments: [], // 评论列表
      info: {
        cnm: '',
        enm: '',
        roles: ''
      },
      box: {
        showst: 0,
        firstWeekBox: 0,
        sumBox: 0
      },
      draControl: true, // 箭头控制器
      draClass: 'detail-dra-down' // 箭头控制器样式
    }
  },
  methods: {
    ...mapMutations([
      'CHANGE_TITLE',
      'CHANGE_SWITCH'
    ]),
    showPosition () {
      this.showPositionValue = true
    },
    changeDra () {
      this.draControl = !this.draControl // 箭头向上
      this.draControl ? (this.draClass = 'detail-dra-down') : (this.draClass = 'detail-dra-up')
    }
  },
  filters: {
    format: function (value) {
      let ret = String(value).length >= 5 ? `${String(value).slice(0, -4)}.${String(value).slice(-4, -3)}` : value
      return ret
    },
    avatar: function (value) {
      return value.replace(/\/w.h/, '')
    },
    time: function (value) {
      return value.split(' ')[0]
    }
  },
  beforeCreate () {
    // fetch data and init reactivity
    let movieId = this.$route.query.id
    // 演员表
    GetCelebrities(movieId).then((res) => {
      let { data } = JSON.parse(res)
      this.celebrityList = data[1]
    }, err => {
      console.error(err)
    })

    // 电影详情
    GetDetail(movieId).then((res) => {
      let data = JSON.parse(res)
      this.detail = data.data.movie
      // 昨日票房排行
      this.box.showst = this.detail.showst
      this.stills = this.detail.photos
    }, err => {
      console.error(err)
    })

    // 评论
    GetComments(movieId).then((res) => {
      let { hcmts } = JSON.parse(res)
      this.comments = hcmts.slice(0, 3)
    }, err => {
      console.error(err)
    })

    // 票房
    GetMBox(movieId).then((res) => {
      let { mbox } = JSON.parse(res)
      this.box.firstWeekBox = mbox.firstWeekBox
      this.box.sumBox = mbox.sumBox
    }, err => {
      console.error(err)
    })
  },
  created () {
    this.CHANGE_SWITCH(true) // 打开组件间跳转动画
  },
  mounted () {
    this.CHANGE_SWITCH(false) // 关闭组件间跳转动画
    this.CHANGE_TITLE('影片详情') // 改变标题
  },
  components: {
    Rater,
    Toast,
    swiper,
    swiperSlide,
    XDialog
  },
  directives: {
    TransferDom
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/base');
#detail {
  background-color: #f5f5f5;
}
.detail-header {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30 / @rem 40 / @rem;
  background-color: #353132;
  .detail-header-img {
    position: relative;
    width: 320 / @rem;
    height: 438 / @rem;
  }
  .detail-header-info {
    width: 680 / @rem;
    padding-left: 44 / @rem;
    padding-top: 28 / @rem;
    .detail-header-info-nm {
      letter-spacing: 1px;
      font-size: 40 / @rem;
      color: #f9fdff;
    }
    .detail-header-info-enm {
      font-size: 30 / @rem;
      color: #f9fdff;
    }
    .detail-header-info-sc {
      font-size: 40 / @rem;
      padding: 0 / @rem 0 0;
      color: #f8c508;
    }
    .detail-header-info-cat {
      font-size: 34 / @rem;
      color: @movieInfo;
    }
    .detail-header-info-commet {
      margin-bottom: 10 / @rem;
      font-size: 30 / @rem;
      color: @movieInfo;
    }
    .detail-header-info-src {
      font-size: 34 / @rem;
      color: @movieInfo;
    }
    .detail-header-info-pubDesc {
      font-size: 34 / @rem;
      color: @movieInfo;
    }
  }
  .detail-header-btn {
    width: 485 / @rem;
    padding: 20 / @rem 0;
    margin-top: 40 / @rem;
    background-color: #646464;
    border: 1px solid #7a7a7a;
    border-radius: 2px;
    .detail-header-btn-wish {
      position: relative;
      font-size: 30 / @rem;
      color: #c1c1c1;
      &:after {
        content: '';
        position: absolute;
        top: -2 / @rem;
        left: -60 / @rem;
        width: 55 / @rem;
        height: 55 / @rem;
        z-index: 999999;
        background: url('../../images/sprite.png') no-repeat 0 -110 / @rem;
        background-size: 200 / @rem 160 / @rem;
      }
    }
    .detail-header-btn-score {
      position: relative;
      font-size: 30 / @rem;
      color: #c1c1c1;
      &:after {
        content: '';
        position: absolute;
        top: 0 / @rem;
        left: -55 / @rem;
        width: 40 / @rem;
        height: 40 / @rem;
        z-index: 999999;
        background: url('../../images/star.png') no-repeat;
        background-size: contain;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
  &:after {
    content: '';
    position: absolute;
    top: 200 / @rem;
    left: 150 / @rem;
    width: 100 / @rem;
    height: 100 / @rem;
    z-index: 999999;
    background: url('../../images/sprite.png') no-repeat -170 / @rem 0;
    background-size: 370 / @rem 280 / @rem;
  }
}
.detail-dra {
  margin-bottom: 30 / @rem;
  background-color: #fff;
  border-bottom: 1px solid #f3e7e7;
  .detail-dra-content {
    margin: 40 / @rem;
    margin-bottom: 0;
    transition: height 1s;
  }
  .detail-dra-down {
    overflow: hidden;
    height: 180 / @rem;
  }
  .detail-dra-up {
    overflow: auto;
    height: auto;
  }
  .detail-dra-control {
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  }
}
.detail-celebrities {
  padding: 40 / @rem;
  margin-bottom: 30 / @rem;
  background-color: #fff;
  border-bottom: 1px solid #f3e7e7;
  border-top: 1px solid #f3e7e7;
  .detail-celebrities-header {
    color: #000;
    font-weight: 400;
    font-size: 40 / @rem;
    padding-bottom: 40 / @rem;
  }
  .detail-celebrities-avatar {
    width: 100%;
  }
  .detail-celebrities-cnm {
    text-align: center;
    font-size: 28 / @rem;
  }
  .detail-celebrities-role {
    text-align: center;
    color: #9c9c9c;
    font-size: 26 / @rem;
  }
}
.detail-stills {
  padding: 40 / @rem;
  margin-bottom: 30 / @rem;
  background-color: #fff;
  border-bottom: 1px solid #f3e7e7;
  border-top: 1px solid #f3e7e7;
  .detail-stills-header {
    color: #000;
    font-weight: 400;
    font-size: 40 / @rem;
    padding-bottom: 40 / @rem;
  }
  .detail-stills-photo {
    width: 100%;
    height: 250 / @rem;
  }
}
.detail-comment {
  margin-bottom: 30 / @rem;
  background-color: #fff;
  border-top: 1px solid #f3e7e7;
  border-bottom: 1px solid #f3e7e7;
  .detail-comment-header {
    padding: 40 / @rem;
    color: #000;
    font-weight: 400;
    font-size: 40 / @rem;
    border-bottom: 1px solid #f3e7e7;
  }
  .detail-comment-content {
    display: flex;
    padding: 40 / @rem 0 0 40 / @rem;
    .detail-comment-avatar {
      width: 88 / @rem;
      height: 88 / @rem;
      margin-right: 40 / @rem;
      border-radius: 50%;
    }
    .detail-comment-item {
      flex: 1;
      padding-bottom: 20 / @rem;
      border-bottom: 1px solid #f3e7e7;
      .detail-comment-name {
        font-size: 34 / @rem;
        font-weight: 400;
      }
      .detail-comment-detail {
        padding: 30 / @rem 70 / @rem 38 / @rem 0;
        font-size: 38 / @rem;
      }
      .detail-comment-date {
        float: left;
        font-size: 26 / @rem;
        color: #9c9c9c;
      }
      .detail-comment-approve {
        position: relative;
        margin-right: 50 / @rem;
        float: right;
        font-size: 26 / @rem;
        color: #9c9c9c;
        &::before {
          position: absolute;
          content: '';
          top: -5 / @rem;
          left: -45 / @rem;
          width: 46 / @rem;
          height: 40 / @rem;
          background: url('../../images/approve.png') no-repeat;
          background-size: contain;
        }
      }
    }
  }
  .detail-comment-content:nth-of-type(3) .detail-comment-item {
    border: 0;
  }
}
.detail-boxOffice {
  padding: 40 / @rem;
  margin-bottom: 30 / @rem;
  border-bottom: 1px solid #f3e7e7;
  background-color: #fff;
  border-top: 1px solid #f3e7e7;
  .detail-boxOffice-header {
    color: #000;
    font-weight: 400;
    font-size: 40 / @rem;
    padding-bottom: 40 / @rem;
  }
  .detail-boxOffice-wrap {
    display: flex;
    justify-content: space-between;
    .detail-boxOffice-item {
      flex: 1;
      .detail-boxOffice-num {
        display: block;
        padding-bottom: 10 / @rem;
        font-size: 52 / @rem;
        text-align: center;
        color: #dd4039;
      }
      .detail-boxOffice-desc {
        display: block;
        text-align: center;
        font-size: 28 / @rem;
        color: #9c9c9c;
      }
    }
  }
}
.weui-dialog {
  .toast-cnm {
    padding-top: 65 / @rem;
    padding-left: 58 / @rem;
    text-align: left;
    font-size: 40 / @rem;
  }
  .toast-enm {
    padding-left: 58 / @rem;
    text-align: left;
    font-size: 28 / @rem;
    color: #6e6e6e;
  }
  .toast-roles {
    padding-left: 58 / @rem;
    padding-bottom: 65 / @rem;
    text-align: left;
    font-size: 36 / @rem;
    color: #9c9c9c;
  }
}
</style>
