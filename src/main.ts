import "mdb-vue-ui-kit/css/mdb.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import "../src/assets/main.css"
import router from "./router";

createApp(App).use(router).mount("#app");
