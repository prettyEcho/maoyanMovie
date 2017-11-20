<template>
  <section class="local">
    <section class="section-wrap">
    <h3 id="locate" class="title">定位城市</h3>
      <div class="btn-wrap">
        <button class="btn">{{locate.city}}</button>
      </div>
    </section>
    <section class="section-wrap">
    <h3 id="recent" class="title">最近访问城市</h3>
      <div class="btn-wrap">
        <button class="btn">北京</button>
        <button class="btn">北京</button>
      </div>
    </section>
    <section class="section-wrap">
    <h3 id="hot" class="title">热门城市</h3>
      <div class="btn-wrap">
        <button class="btn">北京</button>
        <button class="btn">北京</button>
        <button class="btn">北京</button>
        <button class="btn">北京</button>
        <button class="btn">北京</button>
        <button class="btn">北京</button>
        <button class="btn">北京</button>
      </div>
    </section>
    <section class="section-wrap">
    <h3 id="" class="city-title">A</h3>
      <ul class="city-wrap">
        <li class="city">北京</li>
      </ul>
    </section>
  </section>
</template>
//todo:获取到数据后续操作(遍历呈现，更改当前城市)
<script>
  import {mapState,mapMutations} from 'vuex'
  import {cities} from "../../mock/cities"

  export default{
    name: 'city',
    data(){
      return {
        cities,
      }
    },
    created(){
      console.log(this.cities);
    },
    beforeMount(){
      this.CHANGE_TITLE(`当前城市-${this.locate.city}`);  //改变标题
      this.GET_CITIES(this.cities);  //改变标题
    },
    computed: {
      ...mapState({
        locate: state => state.locate, //当前城市
      }),
    },
    methods:{
      ...mapMutations([
        'CHANGE_TITLE',
        'GET_CITIES'
      ])
    }
  }
</script>

<style lang="less" scoped>
@import '../../style/base';

  .local{
    .section-wrap{
      color: #424242;
      .title{
        padding: 20/@rem 35/@rem;
        background-color: #ebebeb;
      }
      .btn-wrap{
        padding: 20/@rem 65/@rem 20/@rem 35/@rem;
        background-color: @f5;
        overflow: hidden;
      }
      .btn{
        float: left;
        width: 291.6/@rem;
        height: 95/@rem;
        margin: 20/@rem 35/@rem 20/@rem 0;
        border: 2px solid #f3f3f3;
        line-height: 95/@rem;
        text-align: center;
        background-color: #fff;
        box-sizing: border-box;
      }
      .city-wrap{
        padding-right: 85/@rem;
        padding-left: 35/@rem;
        background-color: @f5;
      }
      .city{
        height: 123/@rem;
        line-height: 123/@rem;
        border-bottom: 1px solid #cdccd1;
      }
      .city-title{
        padding: 20/@rem 70/@rem;
        background-color: #ebebeb;
      }
    }
  }

</style>
