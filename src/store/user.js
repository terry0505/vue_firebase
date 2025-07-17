import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "../libs/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const isReady = ref(false);

  // 로그인 상태 변경 감지
  const initAuth = () => {
    new Promise((resolve) => {
      onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser;
        isReady.value = true;
      });
    });
  };

  const logout = async () => {
    await signOut(auth);
    user.value = null;
  };

  return {
    user,
    isReady,
    initAuth,
    logout
  };
});
