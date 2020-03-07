import Vue from 'vue'
import App from './App.vue'
import router from './router'

//利用vue原型增加事件,vue 实例可以作为事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
