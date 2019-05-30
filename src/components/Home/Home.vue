<template>
<div class="home">
  <Header title = "在线商城" />
  <!-- <mt-swipe> -->
  <div class="lunbotu">
   <mt-swipe :auto="0">
    <mt-swipe-item v-for="img in lunboList" :key="img.id">
      <img :src="img.img" alt="">
    </mt-swipe-item>
    </mt-swipe>
  </div>
  <div class="nine">
    <ul>
      <li>
        <router-link to="/home/newslist">
          <img class="img" src="./menu1.png" alt="">
          <p class="text">新闻资讯</p>
        </router-link>
      </li>
       <li>
        <router-link to="/home/photolist">
          <img class="img" src="./menu2.png" alt="">
          <p class="text">图文分享</p>
       </router-link>
      </li>
       <li>
        <router-link to="home/shoplist">
          <img class="img" src="./menu3.png" alt="">
          <p class="text">商品展示</p>
      </router-link>
      </li>
       <li>
        <router-link to="home/message">
          <img class="img" src="./menu4.png" alt="">
          <p class="text">留言反馈</p>
      </router-link>
      </li>
       <li>
        <router-link to="/home/search">
          <img class="img" src="./menu5.png" alt="">
          <p class="text">搜索资讯</p>
        </router-link>
      </li>
       <li>
        <router-link to="/home/about">
          <img class="img" src="./menu6.png" alt="">
          <p class="text">关于我们</p>
        </router-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      lunboList: [] // 轮播图数组
    }
  },
  methods: {
    // 获取轮播图数据
    getLunbo () {
      this.$axios.get('getlunbo').then(res => {
        let data = res.data
        if (data.status === 0) {
          this.lunboList = data.message
        }
      }).catch(err => {
        console.log('获取轮播图数据异常' + err)
      })
    }
  },
  created () {
    this.getLunbo()
  },
  components: {}
}
</script>

<style lang="less" scoped>
  .home
    .lunbotu
      .mint-swipe {
        height: 29.9985vh;
          .mint-swipe-items-wrap {
            .mint-swipe-item {
              img {
                width:100%;
                height: 100%;
              }
            }
          }
      }
    .nine {
      margin:1.499vh 0 0 0 ;
      ul {
        li {
          width:33.3%;
          float:left;
          text-align: center;
          line-height: 0.8rem;
          .img {
            width: 60px;
            height: 60px;
          }
          .text{
            font-size: 16px;
            color: black;
          }
        }
      }
    }
</style>
