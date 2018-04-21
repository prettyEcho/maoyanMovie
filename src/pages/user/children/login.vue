<template>
  <section class="e-login">
    <group>
      <x-input class="xbtn-height" title="用户名" name="username" placeholder="请输入用户名" @on-focus="foucs" @on-blur="blur"></x-input>
    </group>

    <group>
      <x-input class="xbtn-height" title="密码" name="password" placeholder="请输入密码"  @on-focus="foucs" @on-blur="blur"></x-input>
    </group>
    <x-button class="xbtn" type="primary">登录</x-button>
  </section>
</template>

<script>
  import {
    XInput,
    Group,
    XButton,
    Cell
  } from 'vux'

  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell
    },
    methods: {
        foucs(value, event) {         
            let target = event.target.parentNode.parentNode;
            target.style.borderWidth = '1px 0';
            target.style.borderStyle= 'solid';
            target.style.borderColor = '#dd4039';
        },
        blur(value, event) {         
            let target = event.target.parentNode.parentNode;
            target.style.border = "none"
        }
    }
  };

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
        &:hover{ 
            border-color: @orange;
        }
    }
    .weui-input{
        font-size: 24px;        
    }
    .weui-label{
        font-size: 24px;                
    }
    .weui-cell__hd{
        font-size: 24px;                        
    }
</style>
