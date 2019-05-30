<template>
  <div class="comment">
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
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      pageindex: 1, // 默认显示的评论页
      comments: [], // 评论数组
      msg: '' // 评论内容
    }
  },
  methods: {
    // 获取评论数据
    getComments () {
      this.$axios.get(`getcomments/${this.id}?pageindex=${this.pageindex}`).then(res => {
        let data = res.data
        if (data.status === 0) {
          // 利用数组拼接，否则点击加载更多会覆盖前面的内容
          this.comments = this.comments.concat(data.message)
        }
      }).catch(err => {
        Toast('获取评论数据失败' + err)
      })
    },
    // 加载更多内容
    getMore () {
      this.pageindex++
      this.getComments()
    },
    // 发表评论
    postComment () {
      if (this.msg.trim().length === 0) {
        return Toast('评论内容不能为空')
      }
      this.$axios.post('postcomment/' + this.id, {
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
    }
  },
  created () {
    this.getComments()
  },
  mounted () {
    // console.log(this.id)
  },
  props: ['id']
}
</script>

<style lang="less" scoped>
.comment {
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
}
</style>
