<template>
<div class="news_detail">
  <div class="detail_wrapper">
   <Header title="新闻详情"/>
   <div class="content_wrapper">
     <h1 class="title">{{detail.title}}</h1>
     <div class="other">
      <span class="click">点击次数：{{detail.click}}次</span>
      <span class="time">添加时间：{{detail.add_time | covertTime('YYYY-MM-DD')}}</span>
     </div>
     <div class="content" v-html="detail.content">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
  name: 'NewsDetail',
  data () {
    return {
      detail: {} // 新闻详情对象
    }
  },
  methods: {
    getDetail () {
      Indicator.open()
      let id = this.$route.query.id
      this.$axios.get('getnew/' + id).then(res => {
        let data = res.data
        if (data.status === 0) {
          this.detail = data.message[0]
          this.$nextTick(() => {
            Indicator.close()
          })
        }
      }).catch(err => {
        console.log('获取数据异常' + err)
      })
    }
  },
  created () {
    this.getDetail()
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.news_detail {
  .detail_wrapper {
    .content_wrapper {
      margin: 0.266667rem;
      .title {
        font-size: 0.426667rem;
        font-weight: 700;
        color: blue;
      }
      .other {
        margin-top: 0.266667rem;
        display: flex;
        justify-content: space-between;
        .click {}
        .time {}
      }
      .content {
        margin-top: 0.266667rem;
        font-size: 0.24rem;
      }
    }
  }
}
</style>
