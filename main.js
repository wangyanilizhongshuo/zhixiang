import Vue from 'vue'
import App from './App'
import request from './common/wjw_uni/wjw_util.js'
Vue.prototype.$App=request
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
