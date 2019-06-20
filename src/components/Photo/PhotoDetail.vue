<template>
<div class="wrapper">
  <Header title="图片详情" />
  <Loading v-show="showLoading" />
  <div class="photo_detail" ref="photo_detail">
      <div class="detail_content">
        <h1 class="title">{{photodetail.title}}</h1>
        <div class="other">
          <span class="time">发表时间：{{photodetail.add_time | covertTime("YYYY-MM-DD")}}</span>
          <span class="click">点击次数：{{photodetail.click}}</span>
        </div>
        <div class="img" @click="forbid">
          <vue-preview
            :list="img"
            :tapToClose='true'
            :thumbImageStyle="{width: '2.666667rem', height: '2.666667rem', 'margin': '0 0 5px 10px', 'border-radius': '5px', 'box-shadow': '0 0 6px #999'}"
            :previewBoxStyle="{display: 'flex', 'flex-wrap': 'wrap'}"
          />
        </div>
        <div class="text" >{{photodetail.content}}</div>
        <Comment :id="id" ref="comment"/>
      </div>
  </div>
</div>
</template>

<script>
import Comment from '../commont/Comment.vue'
import { Toast } from 'mint-ui'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      id: this.$route.params.id,
      photodetail: {}, // 图片分享详情数组
      img: [], // 图片的缩略图
      showLoading: true // loading图
    }
  },
  computed: {
  },
  methods: {
    forbid () {
      console.log(this.Scroll.disable())
    },
    // 获取详情数据
    getPhotoDetial () {
      let id = this.$route.params.id
      this.$axios.get('getimageInfo/' + id).then(res => {
        let data = res.data
        if (data.status === 0) {
          this.photodetail = data.message[0]
          this.$nextTick(() => {
            if (!this.Scroll) {
              this.Scroll = new BScroll('.photo_detail', {
                click: true
              })
            } else {
              this.Scroll = new BScroll('.photo_detail', {
                click: true
              })
            }
          })
        }
        this.showLoading = false
      }).catch(err => {
        Toast('获取数据异常' + err)
        this.showLoading = false
      })
    },
    // 获取图片缩略图
    getImage () {
      let id = this.$route.params.id
      this.$axios.get('getthumimages/' + id).then(res => {
        let data = res.data
        if (data.status === 0) {
          data.message.map(item => {
            item.h = 400
            item.w = 600
          })
          this.img = data.message
        }
      }).catch(err => {
        Toast('获取图片缩略图异常' + err)
      })
    }

  },
  activated () {
    this.id = this.$route.params.id
    this.getPhotoDetial()
    this.getImage()
  },
  deactivated () {
  },
  created () {
  },
  mounted () {
  },
  components: {
    Comment
  }
}
</script>

<style lang='less' scoped>
.wrapper {
  .photo_detail {
    padding: 10px;
    position: fixed;
    top: 44px;
    left: 0;
    bottom: 55px;
    overflow: hidden;
    .detail_content {
      &.is {
        height: 640px;
      }
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
