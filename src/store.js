import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var selectGoods = JSON.parse(localStorage.getItem('selectGoods') || '[]')
export default new Vuex.Store({
  state: {
    selectGoods: selectGoods
  },
  mutations: {
    // 添加购物车
    addSelectGood (state, payload) {
      let flag = false
      state.selectGoods.some(item => {
        if (item.id === payload.id) {
          item.totalCount = payload.totalCount
          item.packageIndex = payload.packageIndex
          flag = true
          return true
        }
      })
      if (!flag) {
        state.selectGoods.unshift(payload)
      }

      localStorage.setItem('selectGoods', JSON.stringify(state.selectGoods))
    },
    // 修改商品状态
    updateGoodsSelected (state, goodInfo) {
      state.selectGoods.some(good => {
        if (good.id === goodInfo.id) {
          good.selected = goodInfo.selected
        }
      })
      localStorage.setItem('selectGoods', JSON.stringify(state.selectGoods))
    },
    //增加购物车中商品的数量的值
    addGoodTotalCount (state, goodId) {
      state.selectGoods.some(good => {
        if (good.id === goodId) {
          good.totalCount++
        }
      })
      localStorage.setItem('selectGoods', JSON.stringify(state.selectGoods))
    },
    //减少购物车中商品的数量的值
    descGoodTotalCount (state, goodId) {
      state.selectGoods.some(good => {
        if (good.id === goodId) {
          good.totalCount--
        }
      })
      localStorage.setItem('selectGoods', JSON.stringify(state.selectGoods))
    },
    //修改购物车中商品的数量的值
    changeGoodTotalCount (state, goodInfo) {
      state.selectGoods.some(good => {
        if (good.id === goodInfo.id) {
          good.totalCount = goodInfo.totalCount
        }
      })

      localStorage.setItem('selectGoods', JSON.stringify(state.selectGoods))
    }
  },
  actions: {

  },
  getters: {
    // 获取商品的状态
    getGoodsSelected (state) {
      let o = {}
      state.selectGoods.forEach(good => {
        o[good.id] = good.selected
      })
      return o
    }
  }
})
