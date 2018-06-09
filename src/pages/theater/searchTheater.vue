<template>
  <section class="search-theater">
    <!-- 搜索框 -->
    <section class="btn-wrap">
      <input type="text" class="search" autofocus placeholder="找影院" v-model="keyword" @keyup="debounce">
      <icon class="icon" type="search"></icon>
      <span class="cancel" @click="cancel">取消</span>
    </section>
    <!-- 搜索框 -->
    <!-- 搜索结果 -->
    <ul class="theater-list">
      <li class="theater-item" v-for="item in list" :key="item.id" @click="goDetail(item)">
        <h5 class="theater-name">
          {{item.nm}}
          <span class="theater-sellPrice">{{item.sellPrice}}</span>
        </h5>
        <p class="theater-addr">{{item.addr}}</p>
        <p class="theater-labels">
          <span class="theater-label">座</span>
        </p>
      </li>
    </ul>
    <!-- 搜索结果 -->
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Icon } from 'vux'
import { SearchCinema } from '../../service/getData'
const _ = require('lodash')

export default {
  name: 'search-theater',
  data () {
    return {
      keyword: '', // 搜索关键词
      list: [] // 搜索结果数组
    }
  },
  computed: {
    ...mapState({
      locate: state => state.locate // 当前城市
    })
  },
  methods: {
    ...mapMutations([
      'CHANGE_TITLE',
      'UPDATE_CINEMA_ID'
    ]),
    cancel () {
      this.keyword = ''
    },
    goDetail (item) {
      this.UPDATE_CINEMA_ID(item.id)
      this.$router.push({ name: 'theaterDetail' })
    },
    debounce: _.debounce(function () {
      SearchCinema(this.locate.ci, this.keyword).then(res => {
        let { data } = JSON.parse(res)
        this.list = data[0].list
      })
    }, 500)
  },
  created () {
    this.CHANGE_TITLE('影院') // 更改标题
  },
  components: {
    Icon
  }
}
</script>

<style lang="less" scoped>
@import '../../style/base';

.search-theater {
  .btn-wrap {
    position: fixed;
    top: 130 / @rem;
    display: flex;
    padding: 20 / @rem 0 20 / @rem 25 / @rem;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
    z-index: 1000;
    .search {
      width: 905 / @rem;
      height: 80 / @rem;
      padding-left: 80 / @rem;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      box-shadow: 0 0 1px rgba(107, 102, 102, 0.33);
    }
    .cancel {
      width: 150 / @rem;
      height: 80 / @rem;
      line-height: 80 / @rem;
      text-align: center;
      color: @orange;
      font-size: 40 / @rem;
    }
    .icon {
      position: absolute;
      left: 40 / @rem;
      top: 40 / @rem;
      font-size: 40 / @rem;
    }
  }

  .theater-list {
    margin-top: 80 / @rem;
    padding-left: 34 / @rem;
    background-color: #ffffff;
    .theater-item {
      padding: 54 / @rem 0;
      border-bottom: 1px solid #dddddd;
      .theater-name {
        font-size: 42 / @rem;
      }
      .theater-sellPrice {
        padding-left: 20 / @rem;
        font-size: 36 / @rem;
        color: #dd4039;
        &::after {
          content: '元起';
          color: #dd4039;
          font-size: 26 / @rem;
        }
      }
      .theater-addr {
        padding: 20 / @rem 0;
        font-size: 36 / @rem;
      }
      .theater-labels {
        .theater-label {
          margin-right: 12 / @rem;
          padding: 8 / @rem;
          font-size: 28 / @rem;
          color: #adc9d4;
          border: 1px solid #adc9d4;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
