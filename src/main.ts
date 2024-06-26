import App from "@/App.vue";
import { createAppRouter } from "@/plugins/router";
import { vuetify } from "@/plugins/vuetify";
import { createApp, ref } from "vue";
import { powerSyncPlugin } from "./plugins/powerSync";
import "./style.css";
import { pinia } from "./plugins/pinia";

const app = createApp(App);
const router = createAppRouter();

app.use(pinia);
app.use(powerSyncPlugin);
app.use(vuetify);
app.use(router);
app.mount("#app");

// A little global variable
export const pageSubtitle = ref("");
