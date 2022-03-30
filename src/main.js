import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Create a Global (reactive) object to share across multiple components
const GStore = reactive({ flashMessage: '' })

createApp(App)
	.use(store)
	.use(router)
	.provide('GStore', GStore) // Make the object available for use by the app's components
	.mount('#app')
