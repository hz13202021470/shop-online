<template>
<div class="news_detail">
 <Header title="新闻详情"/>
  <div class="detail_wrapper">
   <div class="content_wrapper">
     <h1 class="title">{{detail.title}}</h1>
     <div class="other">
      <span class="click">点击次数：{{detail.click}}次</span>
      <span class="time">添加时间：{{detail.add_time | covertTime('YYYY-MM-DD')}}</span>
     </div>
     <div class="content" v-html="detail.content">
      <p><b></b></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
import BScroll from 'better-scroll'
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
            if (!this.newsDetailScroll) {
              this.newslistScroll = new BScroll('.detail_wrapper', {
                // click: true
              })
            } else {
              this.newsDetailScroll.refresh()
            }
          })
        }
      }).catch(err => {
        console.log('获取数据异常' + err)
      })
    }
  },
  created () {
    // this.getDetail()
  },
  mounted () {
  },
  activated () {
    // 当详情页被激活的时候才去获取数据
    this.getDetail()
  }
}
</script>

<style lang="less" >
.news_detail {
  height: 100%;
  .detail_wrapper {
    overflow: hidden;
    position: absolute;
    top: 40px;
    bottom: 55px;
    left: 0;
    .content_wrapper {
      margin: 0.266667rem;
      .title {
        font-size: 0.426667rem;
        font-weight: 700;
        color: blue;
        padding: 0.266667rem 0;
      }
      .other {
        font-size: 12px;
        margin-top: 0.266667rem;
        display: flex;
        justify-content: space-around;
        .click {}
        .time {}
      }
      .content {
        margin-top: 0.266667rem;
        font-size: 0.346667rem;
        overflow: hidden;
        line-height: 20px ;
        &>p {
          text-indent: 0.16rem;
          white-space: pre-wrap;
          &>b {
            display: inline-block;
            text-indent: 0;
            font-size: 16px;
            color: blue;
          }
        }
      }
    }
  }
}
</style>
