<template>
  <transition name="home">

    <router-view></router-view>

  </transition>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      'user-transition': ''
    }
  }
}
</script>

<style scoped lang="less">
/*  .hidden-leave-to {
    opacity: 0;
  }
  .hidden-leave-active {
    transition: all 1s ease;
  } */
.home-enter-active,
.home-leave-active {
  transition: opacity 0.3s;
}

.home-enter,
.home-leave-to {
  opacity: 0;
}

/* .hidden-enter {
    transform: translateX(300px);
  }
  .hidden-enter-active {
    transition: all 1s ease;
  } */
/*  .hidden-enter-to {
    transform: translateX(0);
  } */
</style>
