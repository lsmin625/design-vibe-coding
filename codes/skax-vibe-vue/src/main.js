import { createApp } from 'vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.vue'

const app = createApp(App)
app.use(router);
app.mount('#app')
