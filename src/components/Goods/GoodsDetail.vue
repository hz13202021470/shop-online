<template>
  <div class="goods_detail">
    <Header title="商品详情"/>
   <Loading v-show = 'showLoading'/>
    <div class="wrapper">
      <div class="swiper_wrapper commont">
        <mt-swipe :auto="4000" :showIndicators="true">
          <mt-swipe-item v-for="(img, i) in imgs" :key="i"><img :src="img.src" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="info commont">
        <h1 class="title">{{info.title}}</h1>
        <div class="price">
        <span class="market_price"><del>市场价：￥{{info.market_price}}</del></span>
        <span class="new_price">销售价：<big>￥{{info.sell_price}}</big></span>
        </div>
      </div>
      <div class="parameter commont">
        <h1 class="title">商品参数</h1>
        <div class="content">
          <p class="item"><span>商品货号：</span>{{info.goods_no}}<span></span></p>
          <p class="item"><span>库存情况：</span>{{info.stock_quantity}}件<span></span></p>
          <p class="item"><span>上架时间：</span>{{info.add_time | covertTime("YYYY-MM-DD")}}<span></span></p>
        </div>
      </div>
      <div class="comment_wrapper commont">
        <h1>商品评论</h1>
        <span><mt-button size="small" type="primary">查看更多评论</mt-button></span>
      </div>
      <div class="recommen commont">
       <h3 class="title">商品介绍</h3>
       <div  class="content" v-html="desc.content"></div>
      </div>
     </div>
    <div class="shop_bottom" v-show="!showShopCart" @touchmove.prevent>
      <span class="b_item">占位符</span>
      <span class="b_item">占位符</span>
      <span><mt-button  size="small" type="primary" @click.native="addShop">加入购物车</mt-button></span>
      <span><mt-button size="small" type="primary">立即购买</mt-button></span>
    </div>
     <transition name="cart" mode="in-out">
        <AddShopCart :id="parseInt(id)"
        :maxCount="info.stock_quantity"
        :totalCount="totalCount"
        :sellPrice="info.sell_price"
        :packageIndex="packageIndex"
        :price="price"
        :title="info.title"
        @selectPackage="selectPackage"
        @closeCart="closeCart"
        @addTotalCount="addTotalCount"
        @descTotalCount="descTotalCount"
        @changeTotalCount="changeTotalCount"
        @changePrice="changePrice"
        @addCart="addCart"
        v-if="showShopCart"/>
     </transition>
  </div>
</template>

<script>
import AddShopCart from '../commont/AddShopCart.vue'
export default {
  name: 'goodsDetail',
  data () {
    return {
      id: this.$route.params.id, // 获取路由上的id
      imgs: [], // 轮播图数据
      info: {}, // 商品信息
      desc: {}, // 图文信息
      showShopCart: false, // 控制购物车显示、隐藏
      totalCount: 1, // 总数量
      packageIndex: 0, // 套餐类型
      maxCount: 0, // 最多选择数量
      price: 0,
      showLoading: false
    }
  },
  methods: {
    getImg () {
      return this.$axios.get('getthumimages/' + this.id)
    },
    getInfo () {
      return this.$axios.get('goods/getinfo/' + this.id)
    },
    // 获取图文介绍
    getDesc () {
      return this.$axios.get('goods/getdesc/' + this.id)
    },
    axiosAll () {
      this.showLoading = true
      this.$axios.all([this.getImg(), this.getInfo(), this.getDesc()]).then(this.$axios.spread((getImg, getInfo, getDesc) => {
        let imgData = getImg.data
        let infoData = getInfo.data
        let descData = getDesc.data
        if (imgData.status === 0) {
          this.imgs = imgData.message
        }
        if (infoData.status === 0) {
          this.info = infoData.message[0]
        }
        if (descData.status === 0) {
          this.desc = descData.message[0]
        }
        this.showLoading = false
      })).catch((err) => {
        this.showLoading = false
        this.$toast('获取商品的信息异常' + err)
      })
    },
    // 加入购物车
    addShop () {
      this.showShopCart = true
      this.forbidScroll() // 禁止弹出框滑动
    },
    // 选择套餐
    selectPackage (index) {
      this.packageIndex = index
    },
    // 关闭购物车
    closeCart (status) {
      this.showShopCart = status
    },
    // 增加数量
    addTotalCount (status) {
      console.log("GoodsDetail.vue")
      this.totalCount++
      if (status) {
        this.totalCount = status
      }
    },
    // 减少数量
    descTotalCount (status) {
      this.totalCount--
      if (status) {
        this.totalCount = status
      }
      if (this.totalCount < 1) {
        this.totalCount = 1
      }
    },
    // 改变数量
    changeTotalCount (status) {
      this.totalCount = status
    },
    changePrice (status) {
      this.price = status
    },
    addCart () {
      let goodInfo = {
        id: parseInt(this.id),
        title: this.info.title,
        stockQuantity: this.info.stock_quantity,
        totalCount: this.totalCount,
        price: this.price + this.info.sell_price,
        packageIndex: this.packageIndex,
        img: this.imgs[0].src,
        selected: true
      }
      this.$store.commit('addSelectGood', goodInfo)
      this.showShopCart = false
      this.selectPackage(0)
      // this.$toast('加入购物车成功')
    }
  },
  activated () {
    this.id = this.$route.params.id
    this.axiosAll()
  },
  components: {
    AddShopCart
  },
  watch: {
    // count (newC) {
    //   console.log(this.count)
    //   if (newC === 20) {
    //     this.count = 20
    //     this.$toast('最多购买20件')
    //   }
    // }
  }

}
</script>

<style lang="less">
.goods_detail {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;
  font-size: 17px;
  .commont {
    border: 1px solid #ccc;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .3);
    background-color: #fff;
    margin: 0.4rem 0.4rem 0;
  }
  .wrapper {
    position: absolute;
    top: 44px;
    bottom: 0;
    overflow: scroll;
    width: 100%;
    height: 100%;
    .swiper_wrapper {
      .mint-swipe {
        height: 5.333333rem;
        .mint-swipe-items-wrap {
          .mint-swipe-item {
            text-align: center;
            img {
              height: 100%;
            }
          }
        }
      }
    }
    .info {
      .title {
        margin: 0.266667rem 0;
        padding: 0.133333rem 0.266667rem 0.533333rem;
        border-bottom: 1px solid #ccc;
      }
      .price {
        font-size: 14px;
        padding-bottom: 0.266667rem;
        padding-left: 0.266667rem;
        .market_price {
          color: #8f8f94;
        }
        .new_price {
          margin-left: 0.266667rem;
          big {
            color: red;
            font-weight: 700;
            font-size: 16px;
          }
        }
      }
    }
    .parameter {
      font-size: 17px;
      .title {
        font-weight: 500;
        border-bottom: 1px solid #ccc;
        padding-left: 0.266667rem;
        line-height: 1.12rem;
      }
      .content {
        margin-left: 0.266667rem;
        border-bottom: 1px solid #ccc;
        padding-bottom: 0.266667rem;
        .item {
          font-size: 15px;
          margin: 0.266667rem 0;
          color: #8f8f94;
        }
      }
    }
    .comment_wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
      }
    }
    .recommen {
      .title {
        margin: 0.426667rem 0;
      }
      .content {
        p {
          font-size: 14px;
          margin-top: 0;
          color: #8f8f94;
        }
        img {
          width: 100%;
          height: 100%;
          vertical-align: middle;
        }
        table {
          width: 100%;
        }
      }
    }
  }
  .shop_bottom {
    width: 100%;
    position:fixed;
    bottom: 0;
    left: 0;
    display: flex;
    z-index: 99;
    justify-content: space-between;
    line-height: 40px;
    background-color: #fff;
    .b_item {
      // display: inline-block;
    }
  }
  // 购物车动画
  .cart-enter-active, .cart-leave-active {
    transition: all .3s;
  }
  .cart-enter, .cart-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>
