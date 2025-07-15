<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/">홈</RouterLink> |
        <RouterLink v-if="!user" to="/login">로그인</RouterLink> |
        <span v-if="user">{{ user.email }} 님</span>
        <button v-if="user" @click="logout">로그아웃</button>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import { useUserStore } from "./store/user";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const logout = () => {
      userStore.logout();
    };

    return { user, logout };
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

header {
  background: #333;
  color: white;
  padding: 10px 20px;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 12px;
}

main {
  padding: 20px;
}
</style>
