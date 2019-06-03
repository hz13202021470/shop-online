<template>
   <div class="header_bar">
    <span @click.stop="goback" v-if="show">&lt;返回</span>
    <mt-header :title="title"></mt-header>
   </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  props: ['title'],
  computed: {
    show () {
      if (this.$route.name !== 'home') {
        return true
      }
      return false
    }
  },
  methods: {
    goback (event) {
      this.$router.go(-1)
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.header_bar {
  z-index: 9999;
  span {
    position: absolute;
    top: 9px;
    left: 20px;
    font-size: 18px;
    font-weight: 500;
    color: white;
    z-index: 99;
  }
}
</style>
