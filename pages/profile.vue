<template>
  <div class="text-center">
    Hello {{ username }}
    <br>
    <button
      @click="signInWithGoogle"
      class="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
    >
      {{ user ? 'Change Account' : 'Login' }}
    </button>

    <div v-if="user" class="flex flex-col items-center mt-4">
      <img
        :src="user.photoURL"
        alt="Avatar"
        class="w-24 h-24 rounded-full mt-2 shadow"
      />
    </div>

    <div v-if="user" class="mt-4">
      <button
        @click="signOutUser"
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth, provider, signInWithPopup, signOut } from "../src/auth/firebase";
import apiResource from '../src/composables/apiResource';
const router = useRouter();

const { authenticateFirebaseToken } = apiResource();

const props = defineProps({
  username: String,
});

const emit = defineEmits(['update:username']);
const user = ref(null);

const emitUsername = (username) => {
  if (!username) {
    emit('update:username', 'Guest');
  } else {
    emit('update:username', username, 'Guest');
  }
}

const setupAuthListener = async () => {
  try {
    const authUser = await new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(
        user => { unsubscribe(); resolve(user); },
        error => { unsubscribe(); reject(error); }
      );
    });
    user.value = authUser;
    if (authUser) {
      emitUsername(user.value.displayName);
      console.log('User data loaded:', JSON.stringify(user.value));
    }
  } catch (error) {
    console.error('Auth state error:', error);
  }
};

const signInWithGoogle = async () => {
  try {
    if (user.value) {
      await signOut(auth);
    }
    const result = await signInWithPopup(auth, provider);
    user.value = result.user;
    const idToken = await result.user.getIdToken();
    emitUsername(user.value.displayName);
    console.log("Đăng nhập thành công:", JSON.stringify(user.value));

    if (idToken) {
      try {
        const gatewayLogin = await authenticateFirebaseToken({ idToken });
        if (gatewayLogin && gatewayLogin.accessToken) {
          console.log("Gateway login successful");
        } else {
          console.warn("Gateway chưa sẵn sàng, bỏ qua");
        }
      } catch (err) {
        console.warn("Gateway error, bỏ qua:", err);
      }
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    if (error.code === 'auth/popup-closed-by-user') {
      alert('Bạn đã đóng cửa sổ đăng nhập');
    }
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    user.value = null;
    emitUsername(null);
    console.log("Đăng xuất thành công");
  } catch (error) {
    console.error("Lỗi đăng xuất:", error);
  }
};

onMounted(() => {
  setupAuthListener();
});
</script>