<template>
  <div class="good_list" >
   <Header title="商品展示" />
   <Loading v-show = 'showLoading'/>
   <div class="goods">
     <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"
                  :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                  :bottom-all-loaded="allLoaded" :auto-fill="false"  ref="loadmore">
      <div class="goods_wrapper">
        <ul>
          <router-link :to="{name:'goodsDetail',params:{id:good.id}}" class="goods_item" v-for="(good, i) in goodslist" :key="i" tag="li">
            <div class="goods_content">
              <img :src="good.img_url" alt="">
              <div class="price_wrapper">
                <h1 class="title">{{good.title}}</h1>
                <div class="price">
                  <span class="sell_peice">￥{{good.sell_price}}</span>
                  <span class="market_peice"><del>￥{{good.market_price}}</del></span>
                </div>
                <div class="stock">
                  <span>热卖中</span>
                  <span>剩{{good.stock_quantity}}件</span>
                </div>
              </div>
            </div>
          </router-link>
        </ul>
        <div class="end" v-show="allLoaded">到底了，没有数据</div>
      </div>
      <div slot="top" class="mint-loadmore-top" >
        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
        <mt-spinner :size="10" v-show="topStatus == 'loading'" color="#26a2ff"></mt-spinner>
        <span class="mint-loadmore-text">{{ topText }}</span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
       <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
       <mt-spinner :size="10" v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
       <span class="mint-loadmore-text">{{ bottomText }}</span>
      </div>
     </mt-loadmore>
    </div>
  </div>
</template>

<script>
// import BS from 'better-scroll'
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
      pageindex: 1, // 商品页
      showLoading: true // loading图
    }
  },
  methods: {
    getGoodsListFirst () {
      this.pageindex = 1
      this.$axios.get('getgoods?pageindex=' + this.pageindex).then((res) => {
        let data = res.data
        if (data.status === 0) {
          this.goodslist = data.message
        }
        this.showLoading = false
      }).catch(() => {
        console.log('获取数据失败')
        this.showLoading = false
      })
    },
    getMoreGoods () {
      this.pageindex++
      this.$axios.get('getgoods?pageindex=' + this.pageindex).then((res) => {
        let data = res.data
        if (data.status === 0) {
          this.goodslist = this.goodslist.concat(data.message)
          if (data.message.length === 0) {
            this.allLoaded = true
          }
          this.handleBottomChange('loadingEnd')// 数据加载完毕 修改状态码
          this.$refs.loadmore.onBottomLoaded()
        }
      })
    },
    handleTopChange (status) {
      this.topStatus = status
    },
    loadTop () {
      this.handleTopChange('loading')
      this.allLoaded = false
      this.getGoodsListFirst()
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
      this.getMoreGoods()
    }
  },
  created () {
    this.getGoodsListFirst()
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
<style lang="less">

.good_list {
  .goods {
    position: absolute;
    top: 1.173333rem;
    left: 0;
    bottom: -0.266667rem;
    overflow: scroll;
    // touch-action: none;
  }
  .mint-loadmore {
    .mint-loadmore-content {
      font-size: 14px;
      .goods_wrapper {
        font-size: 14px;
        padding: 0.266667rem;
        ul {
          .goods_item {
            margin-bottom: 0.266667rem;
            padding-bottom: 0.32rem;
            box-shadow: 0 0 0.266667rem #bbb;
            border-radius: 0.266667rem;
            .goods_content {
              display: flex;
              justify-content: space-between;
              img {
                height: 120px;
                box-sizing: border-box;
                border-top-left-radius: 0.266667rem;
              }
              .price_wrapper {
                padding: 0 0.266667rem;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .title {
                  font-size: 14px;
                }
                .price {
                  display: flex;
                  justify-content: space-between;
                  position: relative;
                  .sell_peice {
                    font-size: 16px;
                    color: red;
                    font-weight: bold;
                  }
                  .market_peice {
                    font-size: 12px;
                    position: absolute;
                    top: 0.053333rem;
                    left: 2.133333rem
                  }
                }
                .stock {
                  display: flex;
                  justify-content: space-between;
                  color: #8f8f94;
                }
              }
            }
          }
        }
        .end {
          text-align: center;
          color: #8f8f94;
        }
      }
    }
  }
}
</style>
