import Vue from 'vue'
import App from './App.vue'
import  router  from "./router/index";
import ElementUI from 'element-ui';
import store from "./store";
import axios from "axios";
import api from './api/api';
import './router/permission'
import './utils/localStorage'
import 'element-ui/lib/theme-chalk/index.css';
import* as echarts from 'echarts'
Vue.prototype.$echarts=echarts;

Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
