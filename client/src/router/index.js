import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Homepage from '@/components/Homepage'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Router)
Vue.use(VueAxios, axios)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    }
  ]
})
