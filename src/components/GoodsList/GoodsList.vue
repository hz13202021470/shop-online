<template>
  <div class="good_list">
   <Header title="商品展示" />
   <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"
                :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                :bottom-all-loaded="allLoaded" :auto-fill="true" ref="loadmore">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
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
      allLoaded: false, // 数据是否加载完毕
      bottomStatus: '', // 底部上拉加载状态
      topStatus: '', // 顶部下拉加载状态
      topText: '',
      topPullText: '下拉刷新',
      topDropText: '释放更新',
      topLoadingText: '加载中...',
      bottomText: '',
      bottomPullText: '上拉刷新',
      bottomDropText: '释放更新',
      bottomLoadingText: '加载中...',
      goodslist: [], // 商品列表
      pageindex: 1 // 商品页
    }
  },
  methods: {
    getGoodsList () {
      this.$axios.get('getgoods?pageindex=' + this.pageindex).then((res) => {
        let data = res.data
        if (data.status === 0) {
          this.goodslist = this.goodslist.concat(data.message)
          console.log(this.goodslist)
        }
      }).catch(() => {
        console.log('获取数据失败')
      })
      console.log(this.pageindex)
    },
    handleTopChange (status) {
      this.topStatus = status
    },
    loadTop () {
      this.handleTopChange('loading')
      this.allLoaded = false
      this.goodslist = []
      this.pageindex = 1
      this.getGoodsList()
      setTimeout(() => {
        this.handleTopChange('loadingEnd')// 数据加载完毕 修改状态码
        this.$refs.loadmore.onTopLoaded()
      }, 2000)
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      this.handleBottomChange('loading')
      this.pageindex++
      this.getGoodsList()
      setTimeout(() => {
        this.handleBottomChange('loadingend')
        this.$refs.loadmore.onBottomLoaded()
      }, 2000)
    }
  },
  created () {
    this.getGoodsList()
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
