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
    <!-- <div v-if="user" class="mt-4">
      <p class="text-lg font-semibold">Welcome, display Name {{ user.displayName }}!</p>
    </div> -->

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
import { auth, provider, signInWithPopup, signOut } from "../auth/firebase";
const router = useRouter();

const props = defineProps({
  username: String,
});

const emit = defineEmits(['update:username']);

const user = ref(null);


/// PROPS one/two way binding
const emitUsername = (username) => {

  // if (!username) {
  //   props.username = 'Guest';
  // } else {
  //   props.username = username;
  // }

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
        user => {
          unsubscribe();
          resolve(user);
        },
        error => {
          unsubscribe();
          reject(error);
        }
      );
    });
    
    user.value = authUser;
    
    // cannot update props
    // props.username = user.value.displayName || 'Guest';

    if (authUser) {
      emitUsername(user.value.displayName);
      console.log('User data loaded:', JSON.stringify(user.value));
    }
  } catch (error) {
    console.error('Auth state error:', error);
    showErrorNotification('Failed to check authentication status');
  }
};

const signInWithGoogle = async () => {
  try {
    // Optional: Sign out before signing in again
    if (user.value) {
      await signOut(auth);
    }
    
    const result = await signInWithPopup(auth, provider);
    user.value = result.user;
    console.log(result);
    const idToken = await result.user.getIdToken();
    emitUsername(user.value.displayName);

    console.log("Đăng nhập thành công:", JSON.stringify(user.value));
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    if (error.code === 'auth/popup-closed-by-user') {
      showErrorNotification('Bạn đã đóng cửa sổ đăng nhập');
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

const showErrorNotification = (message) => {
  alert(message);
};

onMounted(() => {
  setupAuthListener();
});
</script>