<template>
  <section class="recent">
    <h3 class="title">近期最受欢迎</h3>
    <ul class="recent-body" @touchstart.prevent="start" @touchmove="move" @touchend="end">
      <li class="item" v-for="item in coming" :key="item.id">
        <p class="love empty"></p>
        <img :src="item.img.replace(/\/w.h/,'')" alt="item.nm" class="img">
        <h3 class="name">{{item.nm}}</h3>
        <p class="wish">{{item.wish}}人想看</p>
        <p class="date">{{item.comingTitle.split(' ').join('').replace(/周\W/,'')}}</p>
      </li>
    </ul>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import getStyle from '../../../script/getStyle'

  export default {
    name: 'recent',
    data(){
      return {
        disX: 0, //当前手指距离左侧的距离
        startX: 0, //ul左边临界值
        endX: 0 //ul右边临界值
      }
    },
    updated(){
      this.$nextTick(function () {
        //初始化body宽度
        let oWrap = document.querySelector('.recent'),
          oBody = document.querySelector('.recent-body'),
          oLi = oBody.querySelectorAll('.item'),style,
          aLi = oLi[0];
        style = getStyle(aLi);
        oBody.style.width = Math.ceil(parseFloat(style.width) * oLi.length) + 'px';

        //确定ul左边临界值
        this.startX = oBody.getBoundingClientRect().left - document.documentElement.clientLeft;
        //确定ul右边临界值
        this.endX = oWrap.getBoundingClientRect().width - oBody.getBoundingClientRect().width;
      })
    },
    computed: {
      ...mapState({
        coming: state => state.wish.coming
      })
    },
    methods: {
      start(ev){
        this.disX = ev.changedTouches[0].clientX;
      },
      move(ev){
        let obj, //当前手指对象
            target, //ul对象
            left; //ul左边距
        //TODO:bug:startX和endX值错误
        obj = ev.changedTouches[0];
        target = document.querySelector('.recent-body');
        left = target.getBoundingClientRect().left - document.documentElement.clientLeft;
        console.log(`差值:${target.getBoundingClientRect().left}`)
        left = left  + obj.clientX - this.disX;
        console.log(`left:${left} ===== startX:${this.startX}`);
        //临界判断
        if(left > this.startX){
          target.style.left = this.startX;
        }else if(left < this.endX){
          target.style.left = this.endX;
        }else{
          //移动ul
          target.style.left = left + 'px';
        }
        this.disX = obj.clientX; //重新赋值
      },
      end(ev){
        this.disX = ev.changedTouches[0].clientX;
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "../../../style/base";

  .recent{
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
    .title{
      padding: 40 / @rem 0;
      color: @6e;
      font-weight: 300;
      font-size: 40 / @rem;
    }
    .recent-body{
      position: absolute;
      left: 32 / @rem;
      .clearfix;
      .item{
        position: relative;
        float: left;
        width: 275 / @rem;
        padding-right: 30 / @rem;
        &:after{
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 85 / @rem;
          height: 85 / @rem;
          background-color: #6d8293;
          opacity: .5;
        }
        .love{
          position: absolute;
          top: 15 / @rem;
          left: 15 / @rem;
          width: 55 / @rem;
          height: 55 / @rem;
          z-index: 99999;
        }
        .empty{
          background: url('../../../images/sprite.png') no-repeat 0 -110/@rem;
          background-size: 220 / @rem 165 / @rem;
        }
        .full{
          background: url('../../../images/sprite.png') no-repeat -165/@rem -55/@rem;
          background-size: 220 / @rem 165 / @rem;
          opacity: .7;
        }
      }
      .img{
        width: 100%;
        height: 330 / @rem;
      }
      .name{
        width: 100%;
        .ellipsis;
      }
      .wish{
        color: @movieInfo;
      }
      .date{
        color: @movieInfo;
      }
    }
  }
</style>
