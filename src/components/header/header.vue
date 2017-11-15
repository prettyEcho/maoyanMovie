<template>
  <x-header :left-options="{backText: '', preventGoBack: true}" v-on:on-click-back="goBack">
    <a slot="left" class="m-title">{{myTitle}}</a>
  </x-header>
</template>

<script>
  import { XHeader } from "vux"
  export default{
    name: "header",
    props: {
      myTitle: String
    },
    components: {
      XHeader
    },
    methods:{
      goBack: function(){
        alert(1);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/base";
  .m-title{
    margin-left: 20px;
    color: #fff !important;
  }
  .vux-header{
    background-color: @orange;
  }
</style>
