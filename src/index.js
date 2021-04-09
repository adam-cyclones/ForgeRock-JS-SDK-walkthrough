// patch required for generators within parcel bundler
import 'regenerator-runtime/runtime'

import Vue from "vue";
import App from "./App.vue";

Vue.config.devtools = true;

new Vue(App).$mount('#app');
