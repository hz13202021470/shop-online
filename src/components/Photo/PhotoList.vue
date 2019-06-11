<template>
  <div class="photo">
    <Loading v-show="showLoading" />
    <Header title="图片分享" />
    <div class="top_scroll">
      <ul class="top_content" :style="{width:largeWidth + 'px'}">
        <li class="item" v-for="(item, i) in cateList" :key="item.id" :class="{'active':current === i}" @click="goToCategory(i, item.id, $event)">{{item.title}}</li>
      </ul>
    </div>
    <!-- 图片分享列表 -->
    <div class="photo_list" v-show="flag">
     <ul>
      <li v-for="photo in list" :key="photo.id">
        <router-link class="link" :to="{name:'photodetail',params:{id:photo.id}}">
         <div class="img">
          <img v-lazy.container="photo.img_url" alt="" :key="photo.id">
         </div>
         <div class="content">
           <h1 class="title">{{photo.title}}</h1>
          <p class="text">{{photo.zhaiyao}}</p>
         </div>
        </router-link>
      </li>
     </ul>
    </div>
    <div class="no_content" v-show="!flag">暂无没有内容</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      cateList: [], // 分类数组
      largeWidth: 0,
      list: [], // 图片列表
      currentIndex: 0,
      flag: true,
      showLoading: true
    }
  },
  computed: {
    current () {
      return this.currentIndex
    }
  },
  methods: {
    // 获取头部滚动分类数据
    getAllcate () {
      this.$axios.get('getimgcategory').then(res => {
        let data = res.data
        if (data.status === 0) {
          this.cateList = data.message
        }
        let all = {
          title: '全部',
          id: 0
        }
        this.cateList.unshift(all)
        this.largeWidth = document.documentElement.clientWidth * 2.5
        this.$nextTick(() => {
          if (!this.topScroll) {
            this.topScroll = new BScroll('.top_scroll', {
              click: true,
              scrollX: true
            })
          } else {
            this.topScroll.refresh()
          }
        })
      }).catch(err => {
        this.$toast({
          message: '获取数据异常' + err,
          position: 'middle',
          duration: 5000
        })
      })
    },
    // 根据分类Id， 获取图片列表
    getPhotoListByCateId (cateId) {
      this.$axios.get(`getimages/${cateId}`).then(res => {
        let data = res.data
        if (data.status === 0) {
          this.list = data.message
        }
        if (this.list.length) {
          this.$nextTick(() => {
            if (!this.photoCateScroll) {
              this.photoCateScroll = new BScroll('.photo_list', {
                click: true
              })
            }
          })
        }
        this.showLoading = false
      }).catch(() => {
        this.$toast({
          message: '获取数据失败'
        })
        this.showLoading = false
      })
    },
    // 跳转分类
    goToCategory (i, id, event) {
      if (!event._constructed) return
      this.currentIndex = i
      this.$axios.get('getimages/' + id).then(res => {
        let data = res.data
        if (data.status === 0) {
          this.list = data.message
        }
        if (!this.list.length) {
          this.flag = false
        } else {
          this.flag = true
        }
      })
    }
  },
  mounted () {
    this.getAllcate()
    this.getPhotoListByCateId(0)
  }
}
</script>

<style lang="less" scoped>
image[lazy=loading] {
  width: 0.533333rem;
  height: 0.533333rem;
  margin: auto;
}
.photo {
  .top_scroll {
    overflow: hidden;
    margin: 0.266667rem 0 0.266667rem 0.266667rem;
    font-size: 14px;
    .top_content {
      display: flex;
      justify-content: space-around;
      .item {
       &.active {
         color:#26a2ff;
         font-size: 16px;
        }
      }
    }
  }
  .photo_list {
    position: absolute;
    top: 2.133333rem;
    bottom: 55px;
    left: 0;
    overflow: hidden;
    width: 100%;
    ul {
      padding: 0 0.533333rem;
      li {
        position:relative;
        margin-bottom: 0.133333rem;
        box-shadow: 0 0 0.213333rem #999;
        border-radius: 0.24rem;
        width: 100%;
        .link {
          display: block;
          color: #fff;
          .img {
            text-align: center;
            img {
              width: 100%;
              vertical-align: middle;
              border-radius: 0.24rem;
            }
           }
          .content {
            overflow: hidden;
            position: absolute;
            bottom:0;
            background-color: rgba(0, 0, 0, 0.4);
            max-height: 2.24rem;
            text-align: left;
            border-radius: 0.24rem;
            .title {
              font-size: 14px;
              margin-bottom: 0.053333rem;
            }
            .text {
              font-size: 13px;
            }
          }
        }
     }
    }
  }
}
</style>
