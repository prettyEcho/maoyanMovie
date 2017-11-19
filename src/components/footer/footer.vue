<template>
  <footer class="footer">
    <div class="section" v-for="item in footers">
      <div class="center">
        <div class="top" :class="[item.title === page ? item.iconNow : item.icon]"></div>
        <div class="bottom" :class="[item.title === page ? 'red' : '']">{{item.title}}</div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'footer',
    data(){
      return{
        footers:[
          {
            title: '电影',
            icon: 'movie',
            iconNow: 'movie-now'
          },
          {
            title: '影院',
            icon: 'theatre',
            iconNow: 'theatre-now'
          },
          {
            title: '我的',
            icon: 'user',
            iconNow: 'user-now'
          }
        ]
      }
    },
    computed: {
      page(){
        return this.$store.state.nowPage;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/base";

  .footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 25 / @rem 0;
    height: 180 / @rem;
    background-color: @body;
    border-top: 1px solid @grey;
    .clearfix;
    .section{
      float: left;
      width: 33.333%;
      height: 130 / @rem;
      .center{
        margin: 0 auto;
        width: 70 / @rem;
        .top{
          width: 70 / @rem;
          height: 70 / @rem;
        }
        .bottom{
          padding-top: 10 / @rem;
          font-size: 35 / @rem;
          color: #949494;
        }
      }
      .red{
        color: #f0423b !important;
      }
      .movie{
        background: url('../../images/sprite.png') no-repeat -70 / @rem 0;
        background-size: 280 / @rem 210 / @rem;
      }
      .movie-now{
        background: url('../../images/sprite.png') no-repeat 0 0;
        background-size: 280 / @rem 210 / @rem;
      }
      .theatre{
        background: url('../../images/sprite.png') no-repeat 0 -70/@rem;
        background-size: 280 / @rem 210 / @rem;
      }
      .theatre-now{
        background: url('../../images/sprite.png') no-repeat -210 / @rem 0;
        background-size: 280 / @rem 210 / @rem;
      }
      .user{
        background: url('../../images/sprite.png') no-repeat -140 / @rem -70 / @rem;
        background-size: 280 / @rem 210 / @rem;
      }
      .user-now{
        background: url('../../images/sprite.png') no-repeat  -70 / @rem -70 / @rem;
        background-size: 280 / @rem 210 / @rem;
      }
    }
  }

</style>
