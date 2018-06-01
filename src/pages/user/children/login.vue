<template>
  <section class="e-login">
    <group>
      <x-input class="xbtn-height" title="用户名" name="username" placeholder="请输入用户名" @on-focus="foucs" @on-blur="blur" v-model="username"></x-input>
    </group>

    <group>
      <x-input class="xbtn-height" title="密 码" name="password" placeholder="请输入密码"  @on-focus="foucs" @on-blur="blur" v-model="password"></x-input>
    </group>
    <x-button class="xbtn" type="primary" @click.native="login">登录</x-button>
  </section>
</template>

<script>
import { XInput, Group, XButton, Cell } from 'vux'
import { Login } from '../../../service/getData'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  methods: {
    foucs (value, event) {
      let target = event.target.parentNode.parentNode
      target.style.borderWidth = '1px 0'
      target.style.borderStyle = 'solid'
      target.style.borderColor = '#dd4039'
    },
    blur (value, event) {
      let target = event.target.parentNode.parentNode
      target.style.border = 'none'
    },
    login () {
      if (!this.username) {
        alert('请输入用户名')
        return
      }

      if (!this.password) {
        alert('请输入密码')
        return
      }

      if (this.username && this.password) {
        Login(this.username, this.password).then(result => {
          let data = JSON.parse(result)
          if (data.code == 1) {
            this.$router.push({ path: '/user'})
          } else {
            alert(data.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../style/base";
.xbtn {
  margin: 20px auto 0;
  width: 96%;
  background-color: @orange;
}
.xbtn-height {
  height: 50px;
  &:hover {
    border-color: @orange;
  }
}
.weui-input {
  font-size: 24px;
}
.weui-label {
  font-size: 24px;
}
.weui-cell__hd {
  font-size: 24px;
}
</style>
