<template>
  <div class="loading" v-if="info.length === 0">
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
    }
  },
  props: ['info']
}
</script>

<style lang="less" scoped>
.loading {
  width: 100%;
  height: 100%;
  position:fixed;
  top: 40px;
  left: 20px;
  bottom: 55px;
  background: url(../../assets/images/lazy.gif) no-repeat;
  background-color: #fff;
}
</style>
