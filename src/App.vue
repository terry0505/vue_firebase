<template>
  <div id="app">
    <Header />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: { Header }
};
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

main {
  padding: 20px;
}
</style>
