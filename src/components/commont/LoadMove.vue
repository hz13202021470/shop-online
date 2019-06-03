<template>
<div class="load_move">
   <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"
                :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
    <slot></slot>
    <div slot="top" class="mint-loadmore-top" style="text-align:center">
      <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
      <mt-spinner v-show="topStatus == 'loading'" color="#26a2ff"></mt-spinner>
      <span class="mint-loadmore-text">{{ topText }}</span>
    </div>
    <div slot="bottom" class="mint-loadmore-bottom">
     <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
     <mt-spinner v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
     <span class="mint-loadmore-text">{{ bottomText }}</span>
    </div>
  </mt-loadmore>
</div>
</template>

<script>
export default {
  data () {
    return {
      // allLoaded: false, // 数据是否加载完毕
      bottomStatus: '', // 底部上拉加载状态
      topStatus: '', // 顶部下拉加载状态
      topText: '',
      topPullText: '下拉刷新',
      topDropText: '释放更新',
      topLoadingText: '加载中...',
      bottomText: '',
      bottomPullText: '上拉刷新',
      bottomDropText: '释放更新',
      bottomLoadingText: '加载中...'
    }
  },
  props: ['allLoaded'],
  methods: {
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      this.handleBottomChange('loading')
      this.$emit('getComments')
      if (this.allLoaded) {
        this.handleBottomChange('loadingend')
        this.$refs.loadmore.onBottomLoaded()
      }
    },
    handleTopChange (status) {
      this.topStatus = status
    },
    loadTop () {
      this.handleTopChange('loading')
      this.allLoaded = false
      this.handleTopChange('loadingEnd')// 数据加载完毕 修改状态码
      this.$refs.loadmore.onTopLoaded()
    }
  },
  watch: {
    topStatus (val) {
      switch (val) {
        case 'pull':
          this.topText = this.topPullText
          break
        case 'drop':
          this.topText = this.topDropText
          break
        case 'loading':
          this.topText = this.topLoadingText
          break
      }
    },
    bottomStatus (val) {
      switch (val) {
        case 'pull':
          this.bottomText = this.bottomPullText
          break
        case 'drop':
          this.bottomText = this.bottomDropText
          break
        case 'loading':
          this.bottomText = this.bottomLoadingText
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.load_move {
  overflow:auto;
  position: absolute;
  top: 44px;
  left: 0;
}
.mint-loadmore-bottom {
 span {
  display: inline-block;
  vertical-align: middle;
  transition: 0.3s linear;
  &.rotate {
   transform: rotate(180deg);
  }
 }
}
</style>
