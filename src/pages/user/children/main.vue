<template>
  <section class="e-user">
      <div class="u-header">
        <img src="../../../images/user.jpg" alt="user" class="u-img">
        <span class="u-word" @click="login">{{user}}</span>
      </div>
      <group>
        <cell class="e-cell" title="我的订单" link="/user/order" is-link></cell>
        <cell class="e-cell" title="优惠券" link="/user/coupon" is-link></cell>
        <cell class="e-cell" title="影院会员卡" link="/user/vip" is-link></cell>
      </group>
      <group>
        <cell class="e-cell" title="想看的电影" link="/user/wanted" is-link></cell>
        <cell class="e-cell" title="看过的电影" link="/user/viewed" is-link></cell>
      </group>
    </section>
</template>

<script>
import { Group, Cell, CellBox } from 'vux'

export default {
  name: 'user',
  data() {
    return {
      user: '用户登录'
    }
  },
  methods:{
    login() {
        console.log(this.$router)
        this.$router.push({name: 'login'})
    }
  },
  components: {
    Group,
    Cell,
    CellBox
  }
}
</script>

<style lang="less" scoped>
@import "../../../style/base";

.e-user {
  .u-header {
    width: 100%;
    height: 300 / @rem;
    background-color: @orange;
    .u-img {
      display: inline-block;
      width: 270/@rem;
      height: 220/@rem;
      padding: 50/@rem 50/@rem 0 50/@rem; 
    }
    .u-word {
      display: inline-block;
      line-height: 300 / @rem;
      height: 300 / @rem;
      vertical-align: top;
      font-size: 40/@rem;
      color: #fff;
      &:hover{
          cursor: pointer;
      }
    }
  }
}
.e-cell {
  color: #272525;
}
</style>
