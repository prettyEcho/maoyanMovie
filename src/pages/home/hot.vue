<template>
  <div>
    <inner-header></inner-header>
    <inner-body></inner-body>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import innerHeader from './children/innerHeader'
  import innerBody from './children/innerBody'

  export default{
    name: 'hot',
    data(){
      return {
      }
    },
    beforeCreate(){
      console.log('beforeCreate hot');
    },
    created(){
      console.log('created hot');
    },
    mounted(){
      console.log('mounted hot')
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
      innerBody
    }
  }
</script>

<style lang="less" scoped>

</style>
