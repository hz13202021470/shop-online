<template>
  <div class="goods_detail">
    <Header title="商品详情"/>
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
      <div class="shopcart_wrapper"  v-if="showShopCart">
        <div class="cover_bg" @click="closeBg"></div>
        <div class="content">
          <div class="package_wrapper">
            <div class="title_wrapper">
              <h1 class="title">套餐类型</h1>
              <span @click="closeBg">关闭</span>
            </div>
            <ul class="package">
              <li class="item" :class="{'current':index === 1}" @click="addPrice(130, 1)">套餐一</li>
              <li class="item" :class="{'current':index === 2}" @click="addPrice(250, 2)">套餐三</li>
              <li class="item" :class="{'current':index === 3}" @click="addPrice(300, 3)">套餐二</li>
            </ul>
          </div>
          <div class="add_cart">
            <label class="text">购买数量</label>
            <div class="num">
              <button class="decrease" :class="{'decrease_off': this.count === 1}" @click="decCount">-</button>
              <input type="text" max="99" min="1" :value="count">
              <button class="increase" @click="addCount">+</button>
            </div>
          </div>
          <div class="totla_price">
           <span>价格：</span>
           <span v-show="this.price">{{info.sell_price + this.price}} 元</span>
          </div>
          <div class="footer">
           <mt-button size="large" type="danger">确认</mt-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'goodsDetail',
  data () {
    return {
      id: this.$route.params.id, // 获取路由上的id
      imgs: [], // 轮播图数据
      info: {}, // 商品信息
      desc: {}, // 图文信息
      showShopCart: false, // 控制购物车显示、隐藏
      price: 0,
      count: 1, // 默认数量为1
      index: 0
    }
  },
  methods: {
    // 获取轮播图
    getImg () {
      this.$axios.get('getthumimages/' + this.id).then((res) => {
        let data = res.data
        if (data.status === 0) {
          this.imgs = data.message
        }
      }).catch((err) => {
        this.$toast('获取数据失败' + err)
      })
    },
    // 获取价格信息
    getInfo () {
      this.$axios.get('goods/getinfo/' + this.id).then((res) => {
        let data = res.data
        if (data.status === 0) {
          this.info = data.message[0]
        }
      }).catch(err => {
        this.$toast('获取商品的信息异常' + err)
      })
    },
    // 获取图文介绍
    getDesc () {
      this.$axios.get('goods/getdesc/' + this.id).then((res) => {
        let data = res.data
        if (data.status === 0) {
          this.desc = data.message[0]
        }
      }).catch((err) => {
        this.$toast('获取图文信息异常' + err)
      })
    },
    // 加入购物车
    addShop () {
      this.showShopCart = true
      this.forbidScroll() // 禁止弹出框滑动
    },
    // 关闭购物车
    closeBg () {
      this.showShopCart = false
      this.canScroll() // 允许弹出框滑动
    },
    // 套餐选择
    addPrice (price, index) {
      this.price = price
      this.index = index
      console.log(this.index)
    },
    addCount () {
      this.count++
      console.log(this.count)
    },
    decCount () {
      this.count--
      if (this.count < 1) {
        this.count = 1
      }
    }
  },
  activated () {
    this.id = this.$route.params.id
    this.getImg()
    this.getInfo()
    this.getDesc()
  },
  components: {
  }

}
</script>

<style lang="less">
.goods_detail {
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
    overflow: scroll;
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
  .shopcart_wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #051b28;
      z-index: 999;
    .cover_bg {
      background-color: rgba(0, 0, 0, .7);
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
    .content {
      position: absolute;
      top: 20%;
      left: 0;
      bottom:0;
      right: 0;
      font-size: 14px;
      background-color: #fff;
      padding: 0.266667rem;
      z-index: 199;
      .title_wrapper {
        display: flex;
        justify-content: space-between;
        margin: 0.266667rem 0;
      }
      .package_wrapper {
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        padding-bottom: 0.266667rem;
        .package {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          .item {
            border: 1px solid red;
            padding: 0 10px;
            line-height: 26px;
            border-radius: 0.266667rem;
            &.current {
              background-color: red;
              color: #fff;
            }
          }
        }
      }
      .add_cart {
        display: flex;
        justify-content: space-between;
        margin-top: 0.533333rem;
        .num {
          height: 0.96rem;
          width: 2.666667rem;
          button {
            width: 0.8rem;
            height: 0.906667rem;
            border: 1px solid #f5f5f5f5;
            background-color: #f5f5f5f5;
            font-size: 24px;
            vertical-align: middle;
          }
          input {
            width: 0.8rem;
            height: 0.906667rem;
            line-height: 0.906667rem;
            border: 1px solid #f5f5f5f5;
            background-color: #f5f5f5f5;
            font-size: 14px;
            box-sizing: border-box;
            text-align: center;
            vertical-align: middle;
          }
          .decrease {
            border-right: 1px solid #fff;
            &.decrease_off {
              color: #ccc;
              background-color: #fbfbfb;
            }
          }
          .increase {
            border-left: 1px solid #fff;
          }
        }
      }
      .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
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
