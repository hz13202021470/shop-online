<template>
  <div class="bottom">
     <mt-tabbar  v-model="selected">
      <mt-tab-item id="home">
        <img @click='changeHash' slot="icon" src="../../assets/images/home.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <img @click='changeHash' slot="icon" src="../../assets/images/member.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img @click='changeHash' slot="icon" src="../../assets/images/shopcart.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="search">
        <img @click='changeHash' slot="icon" src="../../assets/images/search.png">
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    changeHash () {
      // 这里只能用setTimeout 了 不能用$nextTick
      setTimeout(() => {
        this.$router.push({
          name: this.selected
        })
      }, 20)
      // this.$nextTick(() => {
      //   this.$router.push({
      //     name: this.selected
      //   })
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 55px;
  clear: both;
}
</style>
