<template>
  <div class="loading">
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.loading {
  width: 100%;
  height: 100%;
  position:fixed;
  top: 68px;
  left: 0;
  bottom: 55px;
  z-index: 99;
  background: url(../../assets/images/lazy.gif) no-repeat;
  background-color: #fff;
}
</style>
