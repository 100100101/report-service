import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import useInterceptors from './interceptors'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_ORIGIN
useInterceptors(axios)
Vue.use(VueAxios, axios)
