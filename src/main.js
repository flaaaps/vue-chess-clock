/* eslint-ignore */
import { createApp } from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import "./assets/tailwind.css"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

const app = createApp(App)
library.add(faPen, faCheck)
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount("#app")
app.config.productionTip = false
