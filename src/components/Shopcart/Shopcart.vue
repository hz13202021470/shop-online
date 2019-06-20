<template>
<div class="shop_cart">
 <Header title="购物车"/>
 <div class="shopcatr_wrapper">
  <ul class="shopcart_list">
    <li class=shopcatr_item v-for="(good, i) in cartInfo" :key="i">
    <label @change="changSelected(good.id)">
      <input type="checkbox" class="input" :checked="$store.getters.getGoodsSelected[good.id]"/>
      <span></span>
    </label>
      <div class="top">
        <img :src="good.img" alt="" class="img">
        <div class="content">
          <h1 class="title">{{good.title}}</h1>
          <div class="package_wrapper">
            <p class="package">套餐{{good.packageIndex}}</p>
            <p class="stock_quantity">库存{{good.stockQuantity}}</p>
          </div>
          <div class="price">
           <p>￥{{good.price}}</p>
           <div class="number">
            <Numbox :id="good.id"
                    :totalCount="good.totalCount"
                    :maxCount = "good.stockQuantity"
                    @addTotalCount="addTotalCount(good.id)"
                    @descTotalCount="descTotalCount(good.id)"
                    @changeTotalCount="changeTotalCount"
            />
          </div>
        </div>
        </div>
      </div>
    </li>
  </ul>
 </div>
 <BottomBar />
 <div class="shopcatr_bottom">
      <span>占位符</span>
      <span>合计：￥{{$store.getters.getTotalPrice}}</span>
  </div>
</div>
</template>

<script>
import Numbox from '../commont/Numbox.vue'
export default {
  name: 'Shopcart',
  data () {
    return {
      cartInfo: this.$store.state.selectGoods
    }
  },
  methods: {
    // 改变商品状态
    changSelected (id) {
      let selected = this.$store.getters.getGoodsSelected[id]
      this.$store.commit('updateGoodsSelected', { id, selected: !selected })
    },
    addTotalCount (id) {
      this.$store.commit('addGoodTotalCount', id)
    },
    descTotalCount (id) {
      this.$store.commit('descGoodTotalCount', id)
    },
    changeTotalCount (id, totalCount) {
      // id, totalCount 都是Numbox组件传过来的
      // 因为mutations 不接受多个参数，只能把参数写成对象
      this.$store.commit('changeGoodTotalCount', { id: id, totalCount: totalCount })
    }
  },
  created () {
  },
  components: {
    Numbox
  }
}
</script>

<style lang="less" scoped>
.shop_cart {
  position: absolute;
  width: 100%;
  height: 100%;
  .shopcatr_wrapper {
    position: absolute;
    width: 100%;
    overflow: scroll;
    bottom: 1.466667rem;
    top: 40px;
    .shopcart_list {
      padding: 0.266667rem;
      .shopcatr_item {
        display: flex;
        line-height: 0.533333rem;
        font-size: 12px;
        padding: 0.533333rem 0.266667rem;
        box-shadow: 0 0 0.24rem #bbb;
        margin-bottom: 0.266667rem;
        border-radius: 0.266667rem;
        // justify-content: space-between;
        label {
          display: inline-block;
          height: 100%;
          margin-right: 0.266667rem;
          span {
            display: inline-block;
            background-color: #fff;
            border-radius: 100%;
            border: 1px solid #ccc;
            position: relative;
            width: 20px;
            height: 20px;
          }
          span::after {
            content: " ";
            border: 2px solid transparent;
            border-left: 0;
            border-top: 0;
            top: 3px;
            left: 7px;
            position: absolute;
            width: 4px;
            height: 8px;
            transform: rotate(45deg) scale(0);
            transition: transform .2s,-webkit-transform .2s;
          }
          input {
           display: none;
          }
          input:checked + span{
             background-color: #26a2ff;
             border-color: #26a2ff;
          }
          input:checked + span::after {
            border-color: #fff;
            transform: rotate(45deg) scale(1);
          }
        }
        .top {
          display: flex;
          width: 100%;
          .img {
            height: 60px;
            width: 60px;
          }
          .content {
            width: 100%;
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;;
            padding-left: 0.266667rem;
            .package_wrapper {
              display: flex;
              justify-content: space-between;
              margin: 0.133333rem 0;
              font-size: 13px;
            }
            .title {
              font-size: 14px;
            }
            .price {
              color: red;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 16px;
              font-weight: 700;
              .number {
                margin-top: 0.266667rem;
              }
            }
          }
        }
      }
    }
  }
.shopcatr_bottom {
  position: absolute;
  bottom: 55px;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  }
}
</style>
