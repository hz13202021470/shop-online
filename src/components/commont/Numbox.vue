<template>
  <div class="num">
    <button class="decrease" :class="{'decrease_off': this.totalCount === 1}" @click="descTotalCount">-</button>
    <input  type="number" :disabled="this.totalCount == this.maxCount"  :value="this.totalCount" @change="changeTotalCount" ref="numberbox" >
    <button class="increase" @click="addTotalCount">+</button>
  </div>
</template>

<script>
export default {
  name: 'Numbox',
  data () {
    return {
    }
  },
  methods: {
    descTotalCount () {
      if (this.totalCount > 1) {
        this.$emit('descTotalCount')
      }
    },
    addTotalCount () {
       if (this.totalCount >= this.maxCount) {
        this.$toast(`最多购买${this.maxCount}件`)
      } else {
        this.$emit('addTotalCount')
      }
    },
    changeTotalCount () {
      let value = this.$refs.numberbox.value
      let id = this.id
      let preTotalCount = this.totalCount
       if (value > this.maxCount) {
        this.$emit('changeTotalCount', id, parseInt(this.maxCount))
        this.$toast(`最多购买${this.maxCount}件`)
      } else {
        this.$emit('changeTotalCount', id, parseInt(value))
     }
    }
  },
  props: ['id', 'totalCount', 'maxCount']
}
</script>

<style lang="less" scoped>
 .num {
    height: 0.96rem;
    width: 2.666667rem;
          button {
            width: 0.8rem;
            height: 0.693333rem;
            border: 1px solid #f5f5f5f5;
            background-color: #f5f5f5f5;
            font-size: 24px;
            vertical-align: middle;
            line-height: 0.346667rem;
          }
          input {
            width: 0.8rem;
            height: 0.693333rem;
            line-height: 0.693333rem;
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
</style>
