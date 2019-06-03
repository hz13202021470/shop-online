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
