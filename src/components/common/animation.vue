<template>
  <section>
    <img src="../../images/animation.png" alt="animation" class="cat-img">
    <img src="../../images/animation.gif" alt="animation" class="cat-gif">
  </section>
</template>

<script>
export default{
  name: 'animation'
}
</script>

<style lang="less" scoped>
  @import "../../style/base";

  .cat-img{
    display: block;
    margin: 20px auto 0;
    width: 250/@rem;
  }
  .cat-gif{
    display: block;
    margin: 0 auto;
    width: 180/@rem;
  }
</style>
