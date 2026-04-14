<template>
  <section class="min-h-screen bg-slate-50 p-8">
    <div class="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div class="grid md:grid-cols-3">
        <div class="bg-slate-100 p-8 flex flex-col items-center justify-center border-r">
          <div v-if="user">
            <img :src="user.photoURL" alt="Avatar" class="w-36 h-36 rounded-full shadow-lg border-4 border-white" />
          </div>
          <div v-else
            class="w-36 h-36 rounded-full bg-slate-300 flex items-center justify-center text-4xl font-bold text-slate-500">
            ?
          </div>
          <h2 class="mt-5 text-2xl font-bold text-slate-800">
            {{ user?.displayName || "Guest User" }}
          </h2>
          <p class="text-slate-500 text-sm mt-1">
            {{ user?.email || "No email" }}
          </p>
          <div class="mt-6 flex flex-col gap-3 w-full">
            <button @click="signInWithGoogle"
              class="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              {{ user ? "Change Account" : "Login" }}
            </button>
            <button @click="openEditModal"
              class="w-full px-4 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition" v-if="user">
              {{ user ? "Edit Profile" : "" }}
            </button>
            <button v-if="user" @click="signOutUser"
              class="w-full px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
              Logout
            </button>
          </div>
        </div>
        <div class="md:col-span-2 p-8">
          <h1 class="text-3xl font-bold text-slate-800 mb-8">
            Profile Information
          </h1>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-50 rounded-2xl p-5 border">
              <p class="text-sm text-slate-500">Username</p>
              <p class="text-lg font-semibold">{{ user?.displayName || "N/A" }}</p>
            </div>
            <div class="bg-slate-50 rounded-2xl p-5 border">
              <p class="text-sm text-slate-500">Email</p>
              <p class="text-lg font-semibold">
                {{ user?.email || "N/A" }}
              </p>
            </div>
            <div class="bg-slate-50 rounded-2xl p-5 border">
              <p class="text-sm text-slate-500">Phone</p>
              <p class="text-sm font-medium break-all">
                {{ user?.phoneNumber || "N/A" }}
              </p>
            </div>
            <div class="bg-slate-50 rounded-2xl p-5 border">
              <p class="text-sm text-slate-500">Provider</p>
              <p class="text-lg font-semibold">
                {{ user?.providerData?.[0]?.providerId || "N/A" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
      <h2 class="text-2xl font-bold mb-6">Edit Profile</h2>

      <div class="space-y-4">
        <input v-model="profileForm.name" type="text" placeholder="Name" class="w-full border rounded-lg px-4 py-3" />

        <input v-model="profileForm.phone" type="text" placeholder="Phone" class="w-full border rounded-lg px-4 py-3" />

        <input v-model="profileForm.email" type="text" placeholder="Email"
          class="w-full border rounded-lg px-4 py-3" />
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button @click="closeEditModal" class="px-4 py-2 border rounded-lg">
          Cancel
        </button>

        <button @click="saveProfile" class="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Save
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth, provider, signInWithPopup, signOut } from "../src/auth/firebase";
import apiResource from '../src/composables/apiResource';
import { getAuth } from "firebase/auth"
const router = useRouter();

const getFirebaseToken = async () => {
    const authInstance = getAuth()
    let user = authInstance.currentUser

    if (!user) {
      await new Promise((resolve) => {
        const unsubscribe = authInstance.onAuthStateChanged((u) => {
          user = u
          unsubscribe()
          resolve()
        })
      })
    }

    if (!user) {
      try {
        const result = await signInWithPopup(auth, provider)
        user = result.user
        console.log("LOGIN SUCCESS:", user)
      } catch (err) {
        console.error("LOGIN FAIL:", err)
        return null
      }
    }

    if (!user) return null

    return await user.getIdToken(true)
  }
const showEditModal = ref(false)
const profileForm = ref({
  name: '',
  phone: '',
  email: ''
})

const openEditModal = () => {
  profileForm.value = {
    name: user.value?.displayName || '',
    phone: user.value?.phoneNumber || '',
    email: user.value?.email || '',
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
}

const saveProfile = async () => {
  try {
    const gatewayLogin = await authenticateFirebaseToken({ idToken: await getFirebaseToken() });
    const res = await fetch(
      `${import.meta.env.VITE_GATEWAY_URL}/v1/api/partner/organization`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${gatewayLogin.accessToken}`
        },
        body: JSON.stringify(profileForm.value)
      }
    )

    const data = await res.json()
    console.log('Update thành công:', data)
    showEditModal.value = false
  } catch (error) {
    console.error('Update thất bại:', error)
  }
}

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