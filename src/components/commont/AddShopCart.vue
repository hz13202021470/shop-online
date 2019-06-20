<template>
    <transition name="cart" mode="in-out">
      <div class="shopcart_wrapper" >
         <div class="cover_bg" @click="closeBg"></div>
          <div class="content">
            <div class="package_wrapper">
              <h1 class="title">{{this.title}}</h1>
              <div class="type_wrapper">
                <h2 class="type">套餐类型</h2>
                <span @click="closeBg">关闭</span>
              </div>
              <ul class="package">
                <li class="item" :class="{'current':packageIndex === 1}" @click="addPrice(130, 1)">套餐一</li>
                <li class="item" :class="{'current':packageIndex === 2}" @click="addPrice(250, 2)">套餐二</li>
                <li class="item" :class="{'current':packageIndex === 3}" @click="addPrice(300, 3)">套餐三</li>
              </ul>
            </div>
            <div class="add_cart">
              <label class="text">购买数量</label>
              <div class="number">
                <Numbox :id="id" :totalCount="totalCount"
                        :maxCount="maxCount"
                        @addTotalCount="addTotalCount"
                        @descTotalCount="descTotalCount"
                        @changeTotalCount="changeTotalCount"
                />
              </div>
            </div>
            <div class="totla_price">
             <span>价格：</span>
             <span v-show="this.price">{{sellPrice + price}} 元</span>
            </div>
            <div class="footer">
               <mt-button size="large" type="danger" @click="addCart" :disabled="this.packageIndex <= 0">确认</mt-button>
            </div>
          </div>
      </div>
     </transition>
</template>

<script>
import Numbox from './Numbox.vue'
export default {
  name: 'AddShopCart',
  data () {
    return {
    }
  },
  methods: {
    // 关闭购物车
    closeBg () {
      this.$emit('closeCart', false)
      this.canScroll() // 允许弹出框滑动
    },
    // 套餐选择
    addPrice (price, index) {
      this.$emit('changePrice', price)
      this.$emit('selectPackage', index)
    },
    addTotalCount () {
      this.$emit('addTotalCount')
    },
    descTotalCount () {
      this.$emit('descTotalCount')
    },
    changeTotalCount (id, value) {
      this.$emit('changeTotalCount', value)
    },
    // 加入购物车
    addCart () {
      console.log(this.totalCount)
      console.log(this.maxCount)
      if (this.totalCount > this.maxCount) {
        this.$toast('超过数量')
      } else {
        this.$emit('addCart')
        this.$toast('加入购物车成功')
      }
    }
  },
  props: {
    id: {
      type: Number
    },
    initCount: {
      type: Number,
      default: 1
    },
    totalCount: {
      type: Number
    },
    maxCount: {
      type: Number
    },
    packageIndex: {
      type: Number,
      default: 0
    },
    sellPrice: {
      type: Number
    },
    price: {
      type: Number,
      default: 0
    },
    title: {
      type: String
    }
  },
  components: {
    Numbox
  }
}
</script>

<style lang="less" scoped>
.cart-enter-active, .cart-leave-active {
  transition: all .5s;
}
.cart-enter, .cart-leave-to {
  transform: translateY(100%);
}
 .shopcart_wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #051b28;
    z-index: 999;
    .closeBg-enter-active, .closeBg-leave-active {
      transition: opacity .3s;
    }
    .closeBg-enter, .closeBg-leave-to {
      opacity: 1;
    }
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
      .package_wrapper {
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        padding-bottom: 0.266667rem;
        .title {
          font-size: 16px;
          font-weight: 700;
          color: #26a2ff;
        }
        .type_wrapper {
          display: flex;
          justify-content: space-between;
          margin: 0.266667rem 0;
        }
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
</style>
