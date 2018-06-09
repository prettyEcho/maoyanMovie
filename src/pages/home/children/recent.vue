<template>
  <section class="recent">
    <h3 class="title">近期最受欢迎</h3>
    <!-- slides -->
    <swiper class="recent-body" :options="swiperOption" ref="mySwiper">
      <swiper-slide class="item" v-for="item in coming" :key="item.id" :id="item.id">
        <p class="love empty"></p>
        <img :src="item.img.replace(/\/w.h/,'')" :alt="item.nm" class="img">
        <h3 class="name">{{item.nm}}</h3>
        <p class="wish">{{item.wish}}人想看</p>
        <p class="date">{{item.comingTitle.split(' ').join('').replace(/周\W/,'')}}</p>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'recent',
  data () {
    return {
      disX: 0, // 当前手指距离左侧的距离
      startX: 0, // ul左边临界值
      endX: 0, // ul右边临界值
      swiperLength: 0,
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 12,
        on: {
          click: (event) => {
            let movieId = event.target.parentNode.id
            this.goDetail(movieId)
          }
        }
      }
    }
  },
  mounted () {
    console.log('this is current swiper instance object', this.swiper)
  },
  computed: {
    ...mapState({
      coming: state => state.wish.coming
    }),
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    ...mapMutations([
      'CHANGE_MOVIEID'
    ]),
    goDetail (id) {
      // to article
      this.CHANGE_MOVIEID(id)
      this.$router.push({ name: 'article', query: { id } })
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/base';

.recent {
  position: relative;
  width: 100%;
  height: 700 / @rem;
  margin: 0 0 35 / @rem 0;
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
    .item {
      .love {
        position: absolute;
        top: 15 / @rem;
        left: 15 / @rem;
        width: 55 / @rem;
        height: 55 / @rem;
        z-index: 99999;
      }
      .empty {
        background: url('../../../images/sprite.png') no-repeat 0 -110 / @rem;
        background-size: 220 / @rem 165 / @rem;
      }
      .full {
        background: url('../../../images/sprite.png') no-repeat -165 / @rem -55 /
          @rem;
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
