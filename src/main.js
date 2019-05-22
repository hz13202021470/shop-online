import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
