// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import vueRouter from 'vue-router'
import routes from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import jaLocale from 'element-ui/lib/locale/lang/ja'

import zh from './locals/zh-cn.json'
import en from './locals/en.json'
import ja from './locals/ja.json'


var locales = {
  'zh-cn':{
  	...zh,
  	...zhLocale
  },
  en: {
    ...en,
    ...enLocale
  },
  ja: {
  	...ja,
    ...jaLocale
  }
}

Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.config.lang = localStorage.lang || 'zh-cn';
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

//Vue.config.productionTip = false
Vue.use(vueRouter)
const router = new vueRouter({
  routes
})



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
