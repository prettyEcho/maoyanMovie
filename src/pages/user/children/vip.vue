<template>
  <section>
    <img src="item" v-for="item in imgs" v-if="length">
    <p class="word" v-if="!length">空空如也</p>
  </section>
</template>

<script>
import {
  GetVip
} from '../../../service/getData'

export default {
  name: 'coupon',
  data () {
    return {
      imgs: []
    }
  },
  computed: {
    length () {
      return this.imgs.length
    }
  },
  created () {
    GetVip().then(result => {
      let data = JSON.parse(result)
      if (data) {
        this.imgs = JSON.parse(data.data)
      } else {
        alert(data.msg)
      }
    })
  }
}
</script>

<style scoped lang="less">
@import url('../../../style/base');
.word{
    padding-top: 10px;
    font-size: 16px;
    color: #d2baba;
    text-align: center;
}

</style>
