<template>
  <div class="new_list">
    <Header :title="title"/>
    <ul class="list_wrapper">
      <li class="list_item" v-for="list in newslist" :key="list.id">
        <a href="" class="link">
          <div class="img">
            <img :src="list.img_url" alt="">
          </div>
          <div class="content_wrapper">
             <h1 class="title">{{list.title}}</h1>
             <p class="abstrac">{{list.zhaiyao}}</p>
             <div class="other">
              <span class="click_count">点击次数：{{list.click}}</span>
              <span class="time">时间：{{list.add_time | covertTime("YYYY-MM-DD")}}</span>
             </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Header from '../commont/Header'
export default {
  data () {
    return {
      newslist: [], // 新闻列表数组
      title: '新闻列表'
    }
  },
  methods: {
    // 获取新闻列表数据
    getNewsList () {
      this.$axios.get('getnewslist').then((res) => {
        let data = res.data
        if (data.status === 0) {
          this.newslist = data.message
          console.log(this.newslist)
        }
      }).catch((err) => {
        console.log('获取数据异常' + err)
      })
    }
  },
  created () {
    this.getNewsList()
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
  .new_list {
    .list_wrapper {
      margin: 0.266667rem;
      .list_item {
        border-bottom: 1px solid #ccc;
        padding-bottom: 0.4rem;
        .link {
           display: flex;
           margin-top: 0.333333rem;
           color: #26a2ff;
           .img {
             width: 2.0rem;
             height: 1.333333rem;
             img {
              width: 100%;
              height: 100%;
              border-radius: 4px;
             }
           }
           .content_wrapper {
             margin-left: 0.4rem;
             margin-top: 0.066667rem;
             overflow:hidden;
             white-space:nowrap;
             .title {
              font-size: 0.32rem;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap
             }
             .abstrac {
              font-size: 0.266667rem;
              margin: 0.2rem 0;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap
             }
             .other {
                font-size: 0.24rem;
                display: flex;
                justify-content: space-between;
               .click_count {}
               .time {}
             }
           }
     }
    }
   }
  }
</style>
