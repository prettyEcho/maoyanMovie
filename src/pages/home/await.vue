<template>
  <div>
    <inner-header></inner-header>
    <recent></recent>
    <inner-body></inner-body>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import innerHeader from './children/innerHeader'
  import recent from './children/recent'
  import innerBody from './children/innerBody'

  export default{
    name: 'await',
    data(){
      return {
      }
    },
    beforeMount(){
      this.CHANGE_TITLE('猫眼电影');  //改变标题
    },
    methods: {
      ...mapMutations([
        'CHANGE_TITLE'
      ])
    },
    components: {
      innerHeader,
      innerBody,
      recent
    }
  }
</script>

<style lang="less" scoped>

</style>
