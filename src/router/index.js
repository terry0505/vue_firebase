import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import PostList from "../views/PostList.vue";
import NewPost from "../views/NewPost.vue";
import { useUserStore } from "../store/user";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/posts", name: "Posts", component: PostList },
  { path: "/posts/new", component: NewPost, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  //로그인 상태 초기화 완료 대기
  if (!userStore.isReady) {
    await userStore.initAuth();
  }

  //인증이 필요한 페이지인데 비로그인 상태라면 /login으로 이동
  if (to.meta.requiresAuth && !userStore.user) {
    alert("로그인이 필요합니다.");
    return next("/login");
  }

  next();
});

export default router;
