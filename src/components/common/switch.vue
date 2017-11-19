<template>
  <section class="switch">
    <img src="../../images/animation.gif" alt="switch" class="switch-img">
  </section>
</template>

<script>
  export default{
    name: 'switch'
  }
</script>

<style lang="less" scoped>
  @import "../../style/base";

  .switch{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300/@rem;
    z-index: 999;
    transform: translate(-50%, -50%);
    .switch-img{
      width: 100px;
    }
  }
</style>
