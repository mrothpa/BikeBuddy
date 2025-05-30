import '@/assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser,
  faBars,
  faTimes,
  faCheck,
  faPlus,
  faSpinner,
  faThumbsUp,
  faSort,
  faSortUp,
  faSortDown,
  faFilter,
  faDownload,
} from '@fortawesome/free-solid-svg-icons'
import { faVuejs } from '@fortawesome/free-brands-svg-icons'

library.add(
  faUser,
  faBars,
  faTimes,
  faCheck,
  faPlus,
  faSpinner,
  faThumbsUp,
  faVuejs,
  faSort,
  faSortUp,
  faSortDown,
  faFilter,
  faDownload,
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
