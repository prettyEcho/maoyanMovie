<template>
  <section class="recent">
    <h3 class="title">近期最受欢迎</h3>
    <!-- slides -->
    <swiper class="recent-body" :options="swiperOption" ref="mySwiper">
      <swiper-slide class="item" v-for="item in coming" :key="item.id" @click="swiperClick">
        <p class="love empty"></p>
        <img :src="item.img.replace(/\/w.h/,'')" alt="item.nm" class="img">
        <h3 class="name">{{item.nm}}</h3>
        <p class="wish">{{item.wish}}人想看</p>
        <p class="date">{{item.comingTitle.split(' ').join('').replace(/周\W/,'')}}</p>
      </swiper-slide>
    </swiper> 
  </section>
</template>

<script>
import { mapState } from "vuex";
import getStyle from "../../../script/getStyle";
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "recent",
  data() {
    return {
      disX: 0, //当前手指距离左侧的距离
      startX: 0, //ul左边临界值
      endX: 0, //ul右边临界值
      swiperLength: 0,
      swiperOption: {
        notNextTick: true,
        // freeMode: true,
        //slidesPerView: 30,
        // autoplay: 100,
        // loop: false,
        // resistance: true
      }
    };
  },
  updated() {

    /* this.$nextTick(function() {
      this.swiperLength = this.coming.length; 
      //初始化body宽度
      let oWrap = document.querySelector(".recent"),
        oBody = document.querySelector(".recent-body"),
        oLi = oBody.querySelectorAll(".item"),
        style,
        aLi = oLi[0];
      style = getStyle(aLi);
      oBody.style.width =
        Math.ceil(parseFloat(style.width) * oLi.length) + "px";

      //确定ul左边临界值
      this.startX =
        oBody.getBoundingClientRect().left -
        document.documentElement.clientLeft;
      //确定ul右边临界值
      this.endX =
        oWrap.getBoundingClientRect().width -
        oBody.getBoundingClientRect().width;
    }); */
  },
  mounted(){
    console.log('this is current swiper instance object', this.swiper);
  },
  computed: {
    ...mapState({
      coming: state => state.wish.coming
    }),
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    swiperClick() {

    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="less" scoped>
@import "../../../style/base";

.recent {
  position: relative;
  width: 100%;
  height: 700 / @rem;
  margin: 0 0 35/@rem 0;
  padding-left: 32 / @rem;
  padding-bottom: 66 / @rem;
  border-top: 1px solid @grey;
  border-bottom: 1px solid @grey;
  overflow-x: hidden;
  background: #fff;
  .title {
    padding: 40 / @rem 0;
    color: @6e;
    font-weight: 300;
    font-size: 40 / @rem;
  }
  .recent-body {
    position: absolute;
    left: 32 / @rem;
    .clearfix;
    .item {
      position: relative;
      float: left;
      width: 275 / @rem; 
      padding-right: 30 / @rem;
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 85 / @rem;
        height: 85 / @rem;
        background-color: #6d8293;
        opacity: 0.5;
      }
      .love {
        position: absolute;
        top: 15 / @rem;
        left: 15 / @rem;
        width: 55 / @rem;
        height: 55 / @rem;
        z-index: 99999;
      }
      .empty {
        background: url("../../../images/sprite.png") no-repeat 0 -110/@rem;
        background-size: 220 / @rem 165 / @rem;
      }
      .full {
        background: url("../../../images/sprite.png") no-repeat -165/@rem -55/@rem;
        background-size: 220 / @rem 165 / @rem;
        opacity: 0.7;
      }
    }
    .img {
      width: 100%;
      height: 330 / @rem;
    }
    .name {
      width: 100%;
      .ellipsis;
    }
    .wish {
      color: @movieInfo;
    }
    .date {
      color: @movieInfo;
    }
  }
}
</style>
