import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import store from "./store"

Vue.config.productionTip = false

Vue.use(Vuetify, {
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  }
})
const opts = {
  theme: {
    dark: false
  }
}

new Vue({
  vuetify: new Vuetify(opts),
  store,
  render: h => h(App),
}).$mount('#app')
