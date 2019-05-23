<template>
  <div id="app">
    <transition name="showview">
      <keep-alive> <router-view></router-view></keep-alive>
    </transition>
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="home">
        <img slot="icon" src="./assets/images/home.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <img slot="icon" src="./assets/images/member.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img slot="icon" src="./assets/images/shopcart.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="search">
        <img slot="icon" src="./assets/images/search.png">
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: ''
    }
  },
  watch: {
    selected (newV, oldV) {
      this.$router.push({
        name: newV
      })
    }
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
    transform: translateX(-90%);
    position:absolute;
  }
  .showview-enter-active, .showview-leave-active {
    transition:all 0.3s ease;
  }
  #app{
     overflow: hidden;
     .mint-tabbar {
      &>.mint-tab-item {
        &.is-selected {
          background:#fff;
        }
      }
    }
  }
</style>
