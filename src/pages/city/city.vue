<template>
  <section class="local">
    <ul class="nav">
      <li v-for="item in navItem">
        <a class="nav-a" :href="'#'+item.id">{{item.nm}}</a></li>
    </ul>
    <section class="section-wrap">
    <h3 id="locate" class="title">定位城市</h3>
      <div class="btn-wrap">
        <button class="btn" @click.prevent="back">{{locate.city}}</button>
      </div>
    </section>
    <section class="section-wrap">
    <h3 id="recent" class="title">最近访问城市</h3>
      <div class="btn-wrap">
        <button class="btn" @click.prevent="back" v-for="item in recentCity">{{item}}</button>
      </div>
    </section>
    <section class="section-wrap">
    <h3 id="hot" class="title">热门城市</h3>
      <div class="btn-wrap">
        <button class="btn" @click.prevent="back" :key="item.id" v-for="item in hotCities">{{item.nm}}</button>
      </div>
    </section>
    <section class="section-wrap" v-for="(value, key) in cityList">
    <h3 :id="key" class="city-title">{{key}}</h3>
      <ul class="city-wrap">
        <li v-for="(value1, index) in value" @click.prevent="back" :key="value1.id" :class="[index === (value.length - 1) ? 'no-border' : '', 'city']">{{value1.nm}}</li>
      </ul>
    </section>
  </section>
</template>
<script>
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  import {cities} from "../../mock/cities"

  export default{
    name: 'city',
    data(){
      return {
        cities,
        fromPage: '', //进入时的路由
      }
    },
    beforeMount(){
      this.CHANGE_TITLE(`当前城市-${this.locate.city}`);  //改变标题
      this.GET_CITIES(this.cities);  //储存城市列表
    },
    computed: {
      ...mapState({
        locate: state => state.locate, //当前城市
        recentCity: state => state.recentCities //最近搜索城市
      }),
      ...mapGetters([
        'hotCities',
        'cityList'
      ]),
      navItem(){
        let navStart = [], navEnd = [];
        navStart = [
          {
            nm: '定位',
            id: 'locate'
          },
          {
            nm: '最近',
            id: 'recent'
          },
          {
            nm: '热门',
            id: 'hot'
          }
        ];
        for(let attr in this.cityList){
          let temp = {};
          temp.nm = attr;
          temp.id = attr;
          navEnd.push(temp);
        }
        return navStart.concat(navEnd);
      }
    },
    methods:{
      ...mapMutations([
        'CHANGE_TITLE',
        'GET_CITIES',
        'RECENT_CITIES'
      ]),
      ...mapActions([
        'hot',
        'coming',
        'wish'
      ]),
      back(ev){
        this.$router.go(-1); //返回之前的路由
        this.locate.city = ev.target.innerHTML; //更改city
        for(let i of this.cities){    //更改ci
          if(i.nm === ev.target.innerHTML){
           this.locate.ci = i.id;
          }
        }
        //调取数据
        if(this.fromPage === 'hot'){
          this.hot.paging.offset = 0;
          this.hot();
        }else{
          this.coming.paging.offset = this.coming.paging.limit;
          this.wish();
          this.coming();
        }
        //更新最近搜素城市
        this.RECENT_CITIES(ev.target.innerHTML);
      }
    },
    beforeRouteEnter(to, from, next){
      next((vm) => {
        vm.fromPage = from.name;
      });
    },
    //todo：路由改变
    beforeRouteLeave(to, from, next){
      //替换当前路由，为了防止在当前页面改变hash，返回到该页面无法加载内容
      this.$router.replace({name: 'city'}); //bug
      next();
    }
  }
</script>

<style lang="less" scoped>
@import '../../style/base';

  .local{
    position: relative;
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
      .no-border{
        border: 0;
      }
      .city-title{
        padding: 20/@rem 70/@rem;
        background-color: #ebebeb;
      }
    }
    .nav{
      position: fixed;
      right: 0;
      top: 250 / @rem;
      padding-right: 22/@rem;
      font-size: 25/@rem;
      text-align: right;
      .nav-a{
        color: #595959;
      }
    }
  }

</style>
