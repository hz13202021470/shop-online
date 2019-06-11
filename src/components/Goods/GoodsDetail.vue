<template>
  <div class="goods_detail">
    <Header title="商品详情"/>
    <div class="wrapper">
      <div class="swiper_wrapper commont">
        <mt-swipe :auto="4000" :showIndicators="false">
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
  </div>
</template>

<script>
import Comment from '../commont/Comment.vue'
export default {
  name: 'goodsDetail',
  data () {
    return {
      id: this.$route.params.id, // 获取路由上的id
      imgs: [], // 轮播图数据
      info: {}, // 商品信息
      desc: {} // 图文信息
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
            console.log(this.info)
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
    }
  },
  created () {
    this.getImg()
    this.getInfo()
    this.getDesc()
  },
  components: {
    Comment
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
    bottom: 50px;
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
          margin-bottom: 10px;
          color: #8f8f94;
        }
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
