<template>
  <div id="app">
    <transition name="showview">
      <keep-alive><router-view ></router-view></keep-alive>
      <!-- <router-view></router-view> -->
    </transition>
<!--     <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="home">
        <img @click='changeHash' slot="icon" src="./assets/images/home.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <img @click='changeHash' slot="icon" src="./assets/images/member.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img @click='changeHash' slot="icon" src="./assets/images/shopcart.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="search">
        <img @click='changeHash' slot="icon" src="./assets/images/search.png">
        查找
      </mt-tab-item>
    </mt-tabbar>
 -->  </div>
</template>

<script>
export default {
  data () {
    return {
      // selected: ''
    }
  },
  methods: {
    // changeHash () {
    //   // 这里只能用setTimeout 了 不能用$nextTick
    //   setTimeout(() => {
    //     this.$router.push({
    //       name: this.selected
    //     })
    //   }, 20)
    //   // this.$nextTick(() => {
    //   //   this.$router.push({
    //   //     name: this.selected
    //   //   })
    //   // })
    // }
  },
  watch: {
    // selected (newV, oldV) {
    //   this.$router.push({
    //     name: newV
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.showview-enter {
  opacity: 0;
  transform: translateX(100%);
}
.showview-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position:absolute;
}
.showview-enter-active, .showview-leave-active {
  transition:all .5s ease;
}
#app{
   // overflow: hidden;
   // height: 100%;
}
</style>
