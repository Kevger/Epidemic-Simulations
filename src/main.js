import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import Chartkick from "vue-chartkick";
import Chart from "chart.js";

Vue.use(Chartkick.use(Chart));
Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
