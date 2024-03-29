import { createApp } from "vue";
import App from "./App.vue";
import "../src/assets/main.css"
import router from "./router";
import Buefy from '@ntohq/buefy-next'
import '@ntohq/buefy-next/dist/buefy.css';
import {store} from "./models/store";

// @ts-ignore
createApp(App).use(router).use(Buefy).use(store).mount("#app");
