<template>
  <div class="comment">
    <mt-loadmore :bottom-method="loadBottom"
                 :bottom-all-loaded="allLoaded"
                 :auto-fill="false"
                 @bottom-status-change="handleBottomChange"
                 ref="loadmore">
    <h3 class="title">发表评论</h3>
    <hr>
    <textarea placeholder="请输入评论内容" maxlength="120" class="text" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="comment_list">
      <ul>
        <li v-for="(item, i) in comments" :key="i">
          <div class="cmt_info">
            <span class="storey">第{{i+1}}楼</span>
            <span class="user">用户：{{item.user_name}}</span>
            <span class="time">{{item.add_time | covertTime('YYYY-MM-DD hh:mm:ss')}}</span>
          </div>
          <div class="cmt_content">
           {{(item.content === "undefined" ? '此用户很懒什么也没有说': item.content) || (item.content === `` ? '此用户很懒什么也没有说': item.content)}}
          </div>
        </li>
      </ul>
    </div>
    <div v-show="allLoaded" class="end_txt">数据加载完毕</div>
    <div slot="bottom" class="mint-loadmore-bottom">
       <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↑</span>
       <span  v-show="bottomStatus === 'loading'"><mt-spinner type="snake" color="#26a2ff" :size="10"></mt-spinner></span>
       <span class="mint-loadmore-text">{{bottomText}}</span>
    </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      id: this.$route.params.id,
      pageindex: 1, // 默认显示的评论页
      comments: [], // 评论数组
      msg: '', // 评论内容
      allLoaded: false, // 数据是否加载完毕
      bottomStatus: '', // 底部上拉加载状态
      bottomText: '', // 底部上拉加载文字
      bottomPullText: '上拉刷新',
      bottomDropText: '释放更新',
      bottomLoadingText: '加载中...'
    }
  },
  methods: {
    // 获取评论数据
    getComments () {
      this.$axios.get(`getcomments/${this.cId}?pageindex=${this.pageindex}`).then(res => {
        let data = res.data
        if (data.message.length === 0) {
          this.allLoaded = true
          this.handleBottomChange('loadingEnd') // 数据加载完毕 修改状态码
          this.$refs.loadmore.onBottomLoaded()
        }
        if (data.status === 0) {
          // 利用数组拼接，否则点击加载更多会覆盖前面的内容
          this.comments = this.comments.concat(data.message)
        }
      }).catch(err => {
        Toast('获取评论数据失败' + err)
      })
    },
    // 发表评论
    postComment () {
      if (this.msg.trim().length === 0) {
        return Toast('评论内容不能为空')
      }
      this.$axios.post('postcomment/' + this.cId, {
        content: this.msg.trim()
      }).then(res => {
        console.log(res)
        if (res.data.status === 0) {
          let cmt = {
            user_name: 'IT人间迷走',
            add_time: Date.now(),
            content: this.msg.trim()
          }
          this.comments.unshift(cmt)
          this.msg = ''
        }
      }).catch(err => {
        Toast('发表评论失败' + err)
      })
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      this.handleBottomChange('loading')
      this.pageindex++
      this.getComments()
    }
  },
  activated () {
    console.log(this.pageindex)
    this.cId = this.$route.params.id
    this.getComments()
  },
  deactivated () {
    this.pageindex = 1
  },
  mounted () {
    // this.getComments()
  },
  watch: {
    bottomStatus (val) {
      switch (val) {
        case 'pull':
          this.bottomText = this.bottomPullText
          break
        case 'drop':
          this.bottomText = this.bottomDropText
          break
        case 'loading':
          this.bottomText = this.bottomLoadingText
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  font-size: 16px;
  .title {
  }
  .text {
    width: 100%;
    height: 2.133333rem;
    box-sizing: border-box;
  }
  .mint-button--primary {
    margin-bottom: 0.266667rem;
   }
  .comment_list {
    font-size: 14px;
    margin: 0.266667rem 0;
    .cmt_info {
      padding: 0.133333rem 0;
      background-color: #ccc;
      .user {
        margin: 0 0.266667rem;
      }
    }
    .cmt_content {
      margin-top: 0.266667rem;
      text-indent: 2em;
    }
  }
  .end_txt {
    color: #ccc;
    text-align: center;
    font-size: 16px;
  }
  .mint-loadmore-bottom {
     span {
      display: inline-block;
      vertical-align: middle;
      transition: 0.3s linear;
      &.rotate {
       transform: rotate(180deg);
      }
    }
  }
}
</style>
