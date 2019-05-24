import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入移动端适配插件
import 'lib-flexible'
// 引入moment
import Moment from 'moment'
// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 引入头部组件，并注册为全局组件
import Header from './components/commont/Header.vue'

// 引入自己的css
import './assets/css/global.css'
import './assets/css/reset.css'

// 配置axios
import Axios from 'axios'
// 配置公共URL
Axios.defaults.baseURL = 'http://www.liulongbin.top:3005/api/'
Vue.prototype.$axios = Axios

// 使用mint-ui
Vue.use(MintUI)

// 定义moment插件为全局过滤器
Vue.filter('covertTime', function (data, formatStr) {
  return Moment(data).format(formatStr)
})

// 注册为全局组件
Vue.component(Header.name, Header)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
