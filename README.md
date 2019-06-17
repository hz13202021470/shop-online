# shop
一个在线商城的项目
使用vue+vue-cli3+mint-ui+moment(时间格式化插件)
# 完成进度
 1. 2019-05-23 完成新闻列表的布局 
 2. 2019-05-24 完成新闻详情页 （有个问题，我使用keep-alive 保持状态，但是新闻详情页却有bug,这个要认真想一想）
 3. 2019-05-25 修复keep-active 的bug, 在新闻详情页中，把获取数据放到 activated 中，这是keep-active 中的一个属性，说明在组件创建式才发起请求，还有一种就是在router.js中的routes 中，把不需要缓存的设置一个属性keepAlive:false,但是现在有一个新的bug,就是当点击顶部放回按钮的时候会返回两个页面，明天再看看了
 4. 2019-05-26 返回bug已修复，原来是顶部组件放在两个需要滚动的组件中才会发生这样的事情，要让顶部不能滚动才行
 5. 2019-05-27 使用mint-lazyload 可以让图片懒加载，出现bug 就是在谷歌浏览器 version：74.0.3729.169 中，懒加载图片会请求两遍（已解决，在network中，把disable cache 的√ 去掉就可以了，原因未知）
 6. 2019-05-30 对新闻列表，新闻详情，图片分享，图片详情进行美化，例如：下拉加载更多，上拉刷新还没有做，当还没有加载出数据的时候用一张动图表示（出现bug，缩略图查看器有bug）
 7. 2019-05-31 出现重大bug,在新闻详情页和图片分享详情页中，打开第一个详情页没有问题可以滑动，但是到了第二个就滑动不了，不能用refresh ，只能重新用 this.Scroll = new BScroll('.wrapper', {click: true }) 这样的形式
 8. 2019-06-01 想把这个列表页和详情页改成上拉刷新，列表页还是可以改，但是详情页就有点难改，以为评论数据在一个公共组件中，上拉刷新就要把评论也要刷新一次才行,可能要通过父组件调用子组件的方法才行。重新改造了loading图，原来是使用往这个组件传递一个数组，然后通过数组的长度来判断，当时图片列表中，有些分类没有数据，所以产生bug。
 9. 2019-06-03 昨天尝试把上拉刷新和下拉加载合并在一个组件中，但是再使用上better-scroll的刷就会有问题，所以这个就留着放假再做。做了axios的拦截器，可以在请求发出的时候有mint-ui一个加载组件来全局代替，但是得不到我想要全屏的结果，这个看看能不能把他的样式修个。
 10. 2019-06-04， 将loading 组件重构，在里面加一个v-show,然后用vuex 中的一个isLoading 来控制其显示或隐藏，在main.js中的axios 拦截器中修改其值，出现问题，评论下拉加载不需要有loading图，看看怎么解决，下拉加载也出现问题
 11. 2019-06-05 评论组件有bug，就是当评论数据还没有到最后一页时，那个加载中的文字没有得到关闭，商品页由于使用miny-ui 中的loadmove组件，所以不能用better-scroll，两者有冲突
 12. 2019-06-09, 如果mint-ui中的loadmove 上拉不了，需要给mt-loadmove 加一层div包裹，并设置其样式over-flow: scroll，如果还不能上拉，就把index.html 中的 <!DOCTYPE html> 去掉。 完成商品列表的布局
 13. 2019-06-10 ，当商品页下拉后，在上拉会报错 Ignored attempt to cancel a touchmove event with cancelable=false, for example because scrolling is 需要在mint-ui 的包中 common.js 文件--> lib文件夹--> mint-ui.common.js 文件的3064行增加  event.cancelable 这行代码，全局loading失败，还是需要在组件中控制，不能全局控制，否则下拉刷新和上拉加载更多会闪烁
 14. 2019-06-11 大致完成商品详情页，感觉还有可以改一些结构，评论组件的bug就是上拉加载一页后，那个转圈还在转(未修复)
 15. 2019-06-12 修改了一下商品详情页的结构，增加加入购物车，谷歌浏览器有一个bug 就是position为fixed 的时候，绑定的点击事件不生效，要添加z-index才行，用vue的时候，做动画还是有vue提供的来做。
 16. 2019-06-13 完成一部分加入购物车的逻辑，同时修复底部栏那四个链接，当底部做成组件的时候，会在home页面中有浮动元素位置的影响，要把home组件的position设为absolute，height:100%。 当弹出加入购物车，页面会滚动，要全局设置一个方法，当弹出购物的的时候，禁止页面滚动，关闭购物车就让页面滚动。
 17. 2019-06-14 基本完成加入购物车的逻辑，只需把数字框做成一个组件就可以了
 18. 2019-06-15, 抽取加入购物车成为组件,还有加入购物车的逻辑没有完成
 19. 2019-06-17, 完成购物车页面的布局和选中状态

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
