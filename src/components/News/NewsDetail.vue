<template>
<div class="news_detail">
 <Loading v-show="showLoading" />
 <Header title="新闻详情"/>
  <div class="detail_wrapper">
   <div class="content_wrapper">
     <h1 class="title">{{detail.title}}</h1>
    <div class="other">
      <span class="click">点击次数：{{detail.click}}次</span>
      <span class="time">添加时间：{{detail.add_time | covertTime('YYYY-MM-DD')}}</span>
    </div>
    <!-- 内容 -->
    <div class="content" v-html="detail.content">
      <p><b></b></p>
    </div>
    <!-- 评论 -->
    <Comment :id="id" />
    </div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import Comment from '../commont/Comment.vue'
export default {
  name: 'NewsDetail',
  data () {
    return {
      id: this.$route.params.id, // 获取路由上的id
      detail: {}, // 新闻详情数组
      showLoading: true
    }
  },
  methods: {
    getDetail () {
      this.$axios.get('getnew/' + this.id).then(res => {
        let data = res.data
        if (data.status === 0) {
          this.detail = data.message[0]
          this.$nextTick(() => {
            if (!this.newsDetailScroll) {
              this.newsDetailScroll = new BScroll('.detail_wrapper', {
                click: true
              })
            } else {
              this.newsDetailScroll = new BScroll('.detail_wrapper', {
                click: true
              })
            }
          })
        }
        this.showLoading = false
      }).catch(err => {
        console.log('获取数据异常' + err)
        this.showLoading = false
      })
    }
  },
  created () {
    // this.getDetail()
  },
  mounted () {
  },
  activated () {
    this.id = this.$route.params.id
    // 当详情页被激活的时候才去获取数据
    this.getDetail()
  },
  deactivated () {
    this.detail = []
  },
  components: {
    Comment
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
    bottom: 0;
    left: 0;
    .content_wrapper {
      padding: 0.266667rem;
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
