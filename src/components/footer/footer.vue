<template>
  <footer class="footer">
    <div class="section" v-for="(item, index) in footers" :key="item.id">
      <div class="center" @click="change(index)">
        <div class="top" :class="[item.id === nowPage ? item.iconNow : item.icon]"></div>
        <div class="bottom" :class="[item.id === nowPage ? 'red' : '']">{{item.title}}</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'm-footer',
  data () {
    return {
      nowPage: 1,
      footers: [
        {
          id: 1,
          title: '电影',
          icon: 'hot',
          iconNow: 'hot-now'
        },
        {
          id: 2,
          title: '影院',
          icon: 'theater',
          iconNow: 'theater-now'
        },
        {
          id: 3,
          title: '我的',
          icon: 'user',
          iconNow: 'user-now'
        }
      ]
    }
  },
  methods: {
    change (index) {
      let path = this.footers[index]['icon']
      this.nowPage = index + 1
      this.$router.push({ path: path })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/base';

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 25 / @rem 0;
  height: 180 / @rem;
  background-color: @body;
  border-top: 1px solid @grey;
  z-index: 9999;
  .clearfix;
  .section {
    float: left;
    width: 33.333%;
    height: 130 / @rem;
    .center {
      margin: 0 auto;
      width: 70 / @rem;
      .top {
        width: 70 / @rem;
        height: 70 / @rem;
      }
      .bottom {
        padding-top: 10 / @rem;
        font-size: 35 / @rem;
        color: #949494;
      }
    }
    .red {
      color: #f0423b !important;
    }
    .hot {
      background: url('../../images/sprite.png') no-repeat -70 / @rem 0;
      background-size: 280 / @rem 210 / @rem;
    }
    .hot-now {
      background: url('../../images/sprite.png') no-repeat 0 0;
      background-size: 280 / @rem 210 / @rem;
    }
    .theater {
      background: url('../../images/sprite.png') no-repeat 0 -70 / @rem;
      background-size: 280 / @rem 210 / @rem;
    }
    .theater-now {
      background: url('../../images/sprite.png') no-repeat -210 / @rem 0;
      background-size: 280 / @rem 210 / @rem;
    }
    .user {
      background: url('../../images/sprite.png') no-repeat -140 / @rem -70 /
        @rem;
      background-size: 280 / @rem 210 / @rem;
    }
    .user-now {
      background: url('../../images/sprite.png') no-repeat -70 / @rem -70 / @rem;
      background-size: 280 / @rem 210 / @rem;
    }
  }
}
</style>
