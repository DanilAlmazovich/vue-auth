import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import BaseLayout from "./layouts/BaseLayout.vue";
import Notifications from '@kyvg/vue3-notification'


const vuetify = createVuetify({
    components,
    directives,
})

import App from './App.vue'
import router from './router'

import './assets/main.scss'

const app = createApp(App)

app.component('BaseLayout', BaseLayout)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(Notifications)

app.mount('#app')
