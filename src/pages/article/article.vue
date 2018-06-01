
<template>
  <section id="detail">
    <!-- 电影详情header start -->
    <section class="detail-header">
      <img :src="detail.albumImg" :alt="detail.nm" class="detail-header-img">
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
      {{detail.dra}}
    </section>
    <!-- 电影简介 end -->
    <!-- 电影详情演员表 start -->                  
    <section class="detail-celebrities">
      <h5 class="detail-celebrities-header">演职人员</h5>
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in celebrityList" :key="item.id" @click="">
          <img class="detail-celebrities-avatar" :src="item.avatar | avatar" :alt="item.cnm">
          <div class="detail-celebrities-cnm">{{item.cnm}}</div>
          <div class="detail-celebrities-role">{{item.roles}}</div>
        </swiper-slide>
      </swiper>
    </section>
    <!-- 电影详情演员表 end -->                      
    <!-- 演员dialog start -->
    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-demo">
        
      </x-dialog>
    </div>
    <!-- 演员dialog end -->    
  </section>
</template>

<script>

import { GetCelebrities, GetDetail, GetComments } from '../../service/getData'
import { Rater, Toast } from 'vux'
import { swiper, swiperSlide, x-transfer-dom, xDialog } from 'vue-awesome-swiper'

import 'swiper/dist/css/swiper.css'

export default {
  name: 'movie_detail',
  data () {
    return {
      detail: {},
      celebrities: [],
      comments: [],
      showPositionValue: false,
      position: 'middle',
      swiperOption: {
        direction: 'horizontal',
        slidesPerView: 5,
        spaceBetween: 6
      },
      celebrityList: []
    }
  },
  methods: {
    showPosition () {
      this.showPositionValue = true
    }
  },
  filters: {
    format: function (value) {
      let ret = String(value).length >= 5 ? `${String(value).slice(0, -4)}.${String(value).slice(-4, -3)}` : value
      return ret
    },
    avatar: function (value) {
      return value.replace(/\/w.h/,'');
    }
  },
  beforeCreate () {
    // fetch data and init reactivity
    let movieId = this.$route.query.id

    // 演员表
    GetCelebrities(movieId).then((res) => {
      let { data } = JSON.parse(res);
      console.dir(data);
      this.celebrityList = data[1];
    }, err => {
      console.error(err)
    })

    // 电影详情
    GetDetail(movieId).then((res) => {
      let data = JSON.parse(res)
      this.detail = data.data.movie
    }, err => {
      console.error(err)
    })

    // 评论
    GetComments(movieId).then((res) => {
    }, err => {
      console.error(err)
    })
  },
  components: {
    Rater,
    Toast,
    swiper,
    swiperSlide,
    xDialog
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/base');
#detail {
  background-color: #f5f5f5;
}
.detail-header {
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
    top: 340 / @rem;
    left: 150 / @rem;
    width: 100 / @rem;
    height: 100 / @rem;
    z-index: 999999;
    background: url('../../images/sprite.png') no-repeat -170 / @rem 0;
    background-size: 370 / @rem 280 / @rem;
  }
}
.detail-dra {
  font-size: 40/@rem;
  margin-bottom: 30/@rem;
  padding: 40/@rem;
  background-color: #fff;
  border-bottom: 1px solid #f3e7e7;
}
.detail-celebrities {
  padding: 40/@rem;
  background-color: #fff;
  border-top: 1px solid #f3e7e7;
  .detail-celebrities-header {
    color: #000;
    font-weight: 400;
    font-size: 40/@rem;
    padding-bottom: 40/@rem;
  }
  .detail-celebrities-avatar {
    width: 100%;
  }
  .detail-celebrities-cnm {
    text-align: center;
    font-size: 28/@rem;
  }
  .detail-celebrities-role {
    text-align: center;
    color: #9c9c9c;    
    font-size: 26/@rem;
  }
}
</style>
