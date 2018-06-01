<template>
  <section class="e-user">
      <div class="u-header">
        <img src="../../../images/user.jpg" alt="user" class="u-img">
        <span class="u-word" v-if="!username" @click="login">用户登录</span>
        <span class="u-word" v-if="username" @click="logout">{{username}}</span>
      </div>
      <group>
        <cell class="e-cell" title="我的订单" link="/user/order" is-link></cell>
        <cell class="e-cell" title="优惠券" link="/user/coupon" is-link></cell>
        <cell class="e-cell" title="影院会员卡" link="/user/vip" is-link></cell>
      </group>
      <group>
        <cell class="e-cell" title="想看的电影" link="/user/wish" is-link></cell>
        <cell class="e-cell" title="看过的电影" link="/user/viewed" is-link></cell>
      </group>
    </section>
</template>

<script>
import { Group, Cell, CellBox } from 'vux'
import { Logout } from '../../../service/getData'

export default {
  name: 'user',
  data () {
    return {
      username: ''
    }
  },
  computed: {

  },
  methods: {
    login () {
      this.$router.push({name: 'login'})
    },
    logout () {
      let con = confirm('是否要注销')
      if (con) {
        Logout().then(result => {
          let data = JSON.parse(result)
          if (data.code) {
            this.username = this.$cookies.get('username')
          } else {
            alert('注销失败')
          }
        })
      }
    }
  },
  watch: {

  },
  mounted () {
    // 获取username
    this.username = this.$cookies.get('username')
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
