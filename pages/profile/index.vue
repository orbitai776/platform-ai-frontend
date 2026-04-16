<template>
  <section class="min-h-screen bg-slate-50 p-8">
    <div
      class="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
    >
      <div class="grid md:grid-cols-3">
        <!-- LEFT SIDEBAR -->
        <div
          class="bg-slate-100 p-8 flex flex-col items-center justify-center border-r"
        >
          <div v-if="user">
            <img
              :src="user.photoURL"
              alt="Avatar"
              class="w-36 h-36 rounded-full shadow-lg border-4 border-white"
            />
          </div>
          <div
            v-else
            class="w-36 h-36 rounded-full bg-slate-300 flex items-center justify-center text-4xl font-bold text-slate-500"
          >
            ?
          </div>
          <h2 class="mt-5 text-2xl font-bold text-slate-800">
            {{ user?.displayName || "Guest User" }}
          </h2>
          <p class="text-slate-500 text-sm mt-1">
            {{ user?.email || "No email" }}
          </p>
          <div class="mt-6 flex flex-col gap-3 w-full">
            <button
              v-if="user"
              @click="openEditModal"
              class="w-full px-4 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition"
            >
              Edit Profile
            </button>

            <button
              v-if="user"
              @click="signOutUser"
              class="w-full px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
        <!-- RIGHT CONTENT -->
        <div class="md:col-span-2 p-8">
          <!-- TOP TAB BUTTONS -->
          <div class="flex gap-3 mb-6">
            <NuxtLink
              to="/profile"
              class="px-5 py-2 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              User Profile
            </NuxtLink>

            <NuxtLink
              to="/profile/organization"
              class="px-5 py-2 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              Organization Profile
            </NuxtLink>
          </div>

          <!-- TITLE -->
          <h1 class="text-3xl font-bold text-slate-800 mb-8">
            Profile Information
          </h1>

          <!-- PROFILE INFO -->
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-50 rounded-2xl p-5 border">
              <p class="text-sm text-slate-500">Username</p>
              <p class="text-lg font-semibold">
                {{ user?.displayName || "N/A" }}
              </p>
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

  <!-- MODAL -->
  <div
    v-if="showEditModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
      <h2 class="text-2xl font-bold mb-6">Edit Profile</h2>

      <div class="space-y-4">
        <input
          v-model="profileForm.name"
          type="text"
          placeholder="Name"
          class="w-full border rounded-lg px-4 py-3"
        />

        <input
          v-model="profileForm.phone"
          type="text"
          placeholder="Phone"
          class="w-full border rounded-lg px-4 py-3"
        />

        <input
          v-model="profileForm.email"
          type="text"
          placeholder="Email"
          class="w-full border rounded-lg px-4 py-3"
        />
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button @click="closeEditModal" class="px-4 py-2 border rounded-lg">
          Cancel
        </button>

        <button
          @click="saveProfile"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { auth, signOut } from "../../src/auth/firebase";
const user = ref(null);

const showEditModal = ref(false);
const profileForm = ref({
  name: "",
  phone: "",
  email: "",
});

const openEditModal = () => {
  profileForm.value = {
    name: user.value?.displayName || "",
    phone: user.value?.phoneNumber || "",
    email: user.value?.email || "",
  };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const saveProfile = async () => {
  try {
    console.log("Update thành công:", data);
    showEditModal.value = false;
  } catch (error) {
    console.error("Update thất bại:", error);
  }
};

const setupAuthListener = async () => {
  const userRoles = await $fetch("/api/auth/user-roles", {
    method: "GET",
  });
  if (!Array.isArray(userRoles) || userRoles.length < 1) {
    console.log("Không có quyền vào profile, chuyển hướng về login");
    return navigateTo("/login");
  }

  const userProfileData = await $fetch("/api/auth/user-profile", {
    method: "GET",
  });

  // console.log("User profile data:", JSON.stringify(userProfileData));
  user.value = userProfileData;
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    await $fetch("/api/auth/logout", {
      method: "GET",
    });
    user.value = null;
    // emitUsername(null);
    // useCookie("userRoles").value = null;
    // await useFetch("/api/auth/logout", {
    //   method: "GET",
    // });
    navigateTo("/login");
    console.log("Đăng xuất thành công");
  } catch (error) {
    console.error("Lỗi đăng xuất:", error);
  }
};

onMounted(async () => {
  await setupAuthListener();
  try {
    const userRoles = await $fetch("/api/auth/user-roles", {
      method: "GET",
    });
    if (Array.isArray(userRoles) && userRoles.includes("admin")) {
      console.log("User has admin role");
    } else {
      return navigateTo("/");
    }
  } catch (error) {
    console.error("Error fetching user roles:", error);
  }
});
</script>
