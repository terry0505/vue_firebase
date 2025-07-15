// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useUserStore } from "./store/user";

// ✅ 전역 SCSS import
import "./styles/main.scss";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");

// ✅ 로그인 상태 감지
const userStore = useUserStore();
userStore.initAuth();
