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
    <!-- <div v-show="allLoaded" class="end_txt">数据加载完毕</div> -->
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      msg: ''// 评论内容
    }
  },
  methods: {
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
  },
  mounted () {
  },
  props: ['id', 'comments']
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
}
</style>
