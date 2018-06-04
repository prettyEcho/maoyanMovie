<template>
  <section class="wrap">
    <p class="word" v-if="show">空空如也</p>
    <ul class="scroller" v-else>
      <li v-for="item in list" class="item" :key="item.id">
        <section class="center">
          <h2 class="nm">{{item.nm}}
            <span :class="[
            item.ver && item.ver.toLowerCase().indexOf('3d') > -1 ? 'v3d' : '',
            item.ver && item.ver.toLowerCase().indexOf('imax') > -1 ? 'max' : '',
            item.ver && (item.ver.toLowerCase().indexOf('3d') > -1 ||
                         item.ver.toLowerCase().indexOf('imax') > -1) ? 'ver' : ''
          ]"></span>
          </h2>
          <p class="cat">{{item.cat}}</p>
          <p class="desc">{{item.desc}}</p>
          <p class="showInfo">{{ item.showInfo }}</p>
        </section>
        <img :src="item.img.replace(/\/w.h/,'')" alt="" class="left">
        <section class="right">
          <span class="grade">
            <span class="mark">{{item.preSale ? item.wish : item.mk}}</span>{{item.preSale ? '人想看' : '分'}}</span>
          <button :class="[item.preSale ? 'blue' : 'red', 'btn']">{{item.preSale ? '预售' : '购票'}}</button>
        </section>
      </li>
    </ul>
  </section>
</template>

<script>
import { GetOrder } from '../../../service/getData'
export default {
  name: 'order',
  data () {
    return {
      list: [],
      show: false
    }
  },
  created () {
    GetOrder().then(result => {
      let data = JSON.parse(result)
      if (data.code === 1) {
        this.list = JSON.parse(data.data)
      } else if (data.code === 0) {
        alert(data.msg)
        this.$router.push({ path: '/user' })
      } else {
        this.show = true
      }
    })
  }
}
</script>

<style scoped lang="less">
@import '../../../style/base';

.wrap {
  padding-left: 32 / @rem;
  border-top: 1px solid @grey;
  .word {
    padding-top: 10px;
    font-size: 16px;
    color: #d2baba;
    text-align: center;
  }
  .item {
    padding: 50 / @rem 0 50 / @rem;
    border-bottom: 1px solid @grey;
    .clearfix;
    .title {
      padding-bottom: 30 / @rem;
    }
    .left {
      float: left;
      width: 185 / @rem;
      height: 255 / @rem;
      margin-left: -100%;
    }
    .center {
      position: relative;
      float: left;
      width: 100%;
      height: 255 / @rem;
      padding-left: 225 / @rem;
      padding-right: 180 / @rem;
      .nm {
        font-weight: 400;
        font-size: 42 / @rem;
        .ellipsis;
        .ver {
          border: 1px solid @ver;
          border-radius: 2px;
          font-size: 20 / @rem;
          margin-left: 3px;
          padding: 1px 0;
          vertical-align: middle;
        }
        .v3d {
          &:before {
            content: '3D';
            background-color: @ver;
            color: #fff;
            padding: 1px;
          }
        }
        .max {
          &:after {
            content: 'IMAX';
            color: @ver;
            padding: 1px;
          }
        }
      }
      .cat {
        color: @movieInfo;
        padding: 5 / @rem 0;
      }
      .desc {
        color: @movieInfo;
        padding: 5 / @rem 0;
        .ellipsis;
      }
      .showInfo {
        color: @showInfo;
        padding: 5 / @rem 0;
      }
      &:after {
        content: '';
        position: absolute;
        top: 87 / @rem;
        left: 52 / @rem;
        width: 80 / @rem;
        height: 80 / @rem;
        z-index: 999999;
        background: url('../../../images/sprite.png') no-repeat -160 / @rem 0;
        background-size: 320 / @rem 240 / @rem;
      }
    }
    .right {
      position: relative;
      float: left;
      width: 160 / @rem;
      height: 255 / @rem;
      margin-left: -160 / @rem;
      .grade {
        position: absolute;
        right: 30 / @rem;
        color: @mark;
        font-size: 30 / @rem;
        white-space: nowrap;
        .mark {
          font-size: 46 / @rem;
        }
      }
      .btn {
        position: absolute;
        top: 130 / @rem;
        width: 130 / @rem;
        height: 80 / @rem;
        border-radius: 4px;
        font-size: 10px;
        border: 0;
        color: #fff;
      }
      .blue {
        background-color: @btn-blue;
      }
      .red {
        background-color: @btn-red;
      }
    }
  }
}
</style>
