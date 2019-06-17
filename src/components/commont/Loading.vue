<template>
  <div class="loading" v-show="this.$store.state.isLoading">
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.loading {
  width: 100%;
  height: 100%;
  position:fixed;
  top: 1.173333rem;
  left: 0;
  bottom: 1.466667rem;
  z-index: 999;
  background: url(../../assets/images/lazy3.gif) no-repeat center;
  background-color: #fff;
}
</style>
