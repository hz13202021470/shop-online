<template>
 <div class="news">
  <Loading v-show="showLoading" />
  <Header title="新闻列表"/>
  <div class="new_list">
    <ul class="list_wrapper">
      <li class="list_item" v-for="list in newslist" :key="list.id">
        <router-link :to="{name:'newsdetail', params:{id:list.id}}" class="link">
          <div class="img">
            <img v-lazy="list.img_url" alt="">
          </div>
          <div class="content_wrapper">
             <h1 class="title">{{list.title}}</h1>
             <div class="other">
              <span class="click_count">点击次数：{{list.click}}</span>
              <span class="time">时间：{{list.add_time | covertTime("YYYY-MM-DD")}}</span>
             </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      newslist: [], // 新闻列表数组
      showLoading: true
    }
  },
  methods: {
    // 获取新闻列表数据
    getNewsList () {
      this.$axios.get('getnewslist').then((res) => {
        let data = res.data
        if (data.status === 0) {
          this.newslist = data.message
          this.$nextTick(() => {
            if (!this.newslistScroll) {
              this.newslistScroll = new BScroll('.new_list', {
                click: true
              })
            } else {
              this.newslistScroll.refresh()
            }
          })
        }
        this.showLoading = false
      }).catch((err) => {
        console.log('获取数据异常' + err)
        this.showLoading = false
      })
    }
  },
  created () {
    this.getNewsList()
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
  .new_list {
    width: 100%;
    position: absolute;
    top: 30px;
    bottom: 55px;
    left: 0;
    margin-top: 0.266667rem;
    overflow: hidden;
    .list_wrapper {
      padding: 0.133333rem;
      .list_item {
        border: 1px solid #ccc;
        box-shadow: 0 0 0.133333rem #ccc;
        padding-bottom: 20px;
        margin-top: 5px;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        .link {
           display: flex;
           color: #26a2ff;
           .img {
             width: 2.0rem;
             height: 1.333333rem;
             img {
              width: 1.706667rem;
              height: 1.706667rem;
              border-radius: 4px;
             }
           }
           .content_wrapper {
             margin-left: 0.4rem;
             margin-top: 0.066667rem;
             overflow:hidden;
             white-space:nowrap;
             width: 100%;
             .title {
              font-size: 14px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap
             }
             .other {
                margin-top: 0.266667rem;
                font-size: 12px;
                width: 100%;
                display: flex;
                justify-content: space-around;
               .click_count {
               }
               .time {
                // margin-left: 1.333333rem
               }
             }
           }
     }
    }
   }
  }
</style>
