import { createApp } from 'vue'
// import { setupProdMockServer } from './utils/mockProdServer'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import './style/common.scss'

// if ( process.env.NODE_ENV === 'production' ) {
//   setupProdMockServer()
// }

createApp(App).use(ElementPlus).use(router).use(store).mount('#app')
