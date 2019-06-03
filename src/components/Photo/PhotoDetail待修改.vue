<template>
<div class="wrapper">
  <Header title="图片详情" />
  <Loading v-if="isflag"/>
  <LoadMove @getComments="getComments" :allLoaded="allLoaded">
   <div class="photo_detail" ref="photo_detail">
      <div class="detail_content">
        <h1 class="title">{{photodetail.title}}</h1>
        <div class="other">
          <span class="time">发表时间：{{photodetail.add_time | covertTime("YYYY-MM-DD")}}</span>
          <span class="click">点击次数：{{photodetail.click}}</span>
        </div>
        <div class="img">
          <vue-preview
            :list="img"
            :tapToClose='true'
            :thumbImageStyle="{width: '2.666667rem', height: '2.666667rem', 'margin': '0 0 5px 10px', 'border-radius': '5px', 'box-shadow': '0 0 6px #999'}"
            :previewBoxStyle="{display: 'flex', 'flex-wrap': 'wrap'}"
          />
        </div>
        <div class="text">{{photodetail.content}}</div>
        <Comment :id="id" :comments="comments" ref="comment"/>
      </div>
   </div>
  </LoadMove>
</div>
</template>

<script>
import Comment from '../commont/Comment.vue'
import LoadMove from '../commont/LoadMove.vue'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      id: this.$route.params.id,
      photodetail: {}, // 图片分享详情数组
      img: [], // 图片的缩略图
      isflag: false,
      pageindex: 1, // 默认显示的评论页
      comments: [], // 评论数组
      allLoaded: false
    }
  },
  computed: {
  },
  methods: {
    get () {
      console.log('get')
    },
    // 获取详情数据
    getPhotoDetial () {
      this.isflag = true
      this.$axios.get('getimageInfo/' + this.id).then(res => {
        let data = res.data
        if (data.status === 0) {
          this.photodetail = data.message[0]
          this.isflag = false
        }
      }).catch(err => {
        Toast('获取数据异常' + err)
      })
    },
    // 获取图片缩略图
    getImage () {
      this.$axios.get('getthumimages/' + this.id).then(res => {
        let data = res.data
        if (data.status === 0) {
          data.message.forEach(item => {
            item.h = 400
            item.w = 600
          })
          this.img = data.message
        }
      }).catch(err => {
        Toast('获取图片缩略图异常' + err)
      })
    },
    // 获取评论数据
    getComments () {
      this.$axios.get(`getcomments/${this.id}?pageindex=${this.pageindex}`).then(res => {
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
        Toast('没有数据了')
        this.allLoaded = true
      })
      this.pageindex++
    }
  },
  activated () {
    this.id = this.$route.params.id
    this.getImage()
    this.getPhotoDetial()
    this.getComments()
  },
  deactivated () {
    this.img = []
  },
  created () {
  },
  mounted () {
  },
  components: {
    Comment,
    LoadMove
  }
}
</script>

<style lang='less' scoped>
.wrapper {
  .photo_detail {
    padding: 10px;
    box-sizing:border-box;
    .detail_content {
      .title {
        color:#26a2ff;
        text-align: center;
        line-height: 20px;
        font-size: 18px;
        font-weight: 500;
      }
      .other {
        display: flex;
        justify-content: space-between;
        margin-top: 0.266667rem;
        margin-bottom: 0.266667rem;
        font-size: 14px;
        .time {}
        .click {}
      }
      .img {
        // width: 100%;
        // height: 100%;
        div {
          // width: 100%;
          // height: 100%;
        }
      }
      .text {
        font-size: 14px;
        text-indent: 0.533333rem;
        line-height: 0.586667rem;
      }
    }
  }
}
</style>
