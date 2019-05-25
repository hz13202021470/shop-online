# shop
一个在线商城的项目
使用vue+vue-cli3+mint-ui+moment(时间格式化插件)
# 完成进度
 1. 2019-05-23 完成新闻列表的布局 
 2. 2019-05-24 完成新闻详情页 （有个问题，我使用keep-alive 保持状态，但是新闻详情页却有bug,这个要认真想一想）
 3. 2019-05-25 修复keep-active 的bug, 在新闻详情页中，把获取数据放到 activated 中，这是keep-active 中的一个属性，说明在组件创建式才发起请求，还有一种就是在router.js中的routes 中，把不需要缓存的设置一个属性keepAlive:false,但是现在有一个新的bug,就是当点击顶部放回按钮的时候会返回两个页面，明天再看看了

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
