<template>
  <section class="theater">
    <!-- 城市选择 -->
    <div class="city">
      <router-link class="local" :to="{name: 'city'}">{{locate.city}}</router-link>
    </div>
    <!-- 城市选择 -->
    <!-- 搜索框 -->
    <section class="theater-search">
      <input type="text" class="search" placeholder="找影院" disabled>
      <icon class="icon" type="search"></icon>
    </section>
    <!-- 搜索框 -->
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Icon } from 'vux'

export default {
  name: 'theater',
  computed: {
    ...mapState({
      locate: state => state.locate // 当前城市
    })
  },
  methods: {
    ...mapMutations([
      'CHANGE_TITLE'
    ])
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

.theater {
  width: 100%;
  height: 130 / @rem;
  background-color: #fff;
  position: fixed;
  top: 140 / @rem;
  display: flex;
  padding: 24 / @rem;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
  z-index: 1000;
  .city {
    width: 150 / @rem;
    height: 76 / @rem;
    line-height: 76 / @rem;
    text-align: left;
    .local {
      color: @cityC;
      font-size: 34 / @rem;
      &:after {
        content: '';
        position: relative;
        top: 8px;
        left: 5px;
        .triangle-bottom(12/@rem, #cacaca);
      }
    }
  }
  .theater-search {
    position: relative;
    .search {
      width: 874 / @rem;
      height: 80 / @rem;
      padding-left: 400 / @rem;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
    }
    .icon {
      position: absolute;
      left: 340 / @rem;
      top: 20 / @rem;
      font-size: 40 / @rem;
      color: #cfcfcf;
    }
  }
}
</style>
