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
              :src="user?.photoURL"
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
            <div class="mt-6 flex flex-col gap-3 w-full">
              <button
                v-if="user && organization"
                @click="openEditModal"
                class="w-full px-4 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition"
              >
                Edit Profile
              </button>

              <button
                v-else-if="user && !organization"
                @click="openEditModal"
                class="w-full px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                Set up Organization
              </button>
            </div>
          </div>
        </div>

        <!-- RIGHT CONTENT -->
        <div class="md:col-span-2 p-8">
          <!-- TOP TAB BUTTONS -->
          <div class="flex gap-3 mb-6">
            <NuxtLink
              to="/profile"
              class="px-5 py-2 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              User Profile
            </NuxtLink>
            <NuxtLink
              to="/profile/organization"
              class="px-5 py-2 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Organization Profile
            </NuxtLink>
          </div>
          <h1 class="text-3xl font-bold text-slate-800 mb-8">
            Organization Information
          </h1>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-50 rounded-2xl p-5 border">
              <p class="text-sm text-slate-500">Organization Name</p>
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
            <div class="bg-slate-50 rounded-2xl p-5 border md:col-span-2">
              <p class="text-sm text-slate-500">Description</p>
              <p class="text-base font-medium text-slate-700">
                {{ user?.description || "N/A" }}
              </p>
            </div>
            <div class="bg-slate-50 rounded-2xl p-5 border md:col-span-2">
              <p class="text-sm text-slate-500">Address</p>
              <p class="text-base font-medium text-slate-700">
                {{ user?.address || "N/A" }}
              </p>
            </div>
            <div class="bg-slate-50 rounded-2xl p-5 border">
              <p class="text-sm text-slate-500">Phone</p>
              <p class="text-base font-medium">
                {{ user?.phoneNumber || "N/A" }}
              </p>
            </div>
            <div class="bg-slate-50 rounded-2xl p-5 border">
              <p class="text-sm text-slate-500">Status</p>
              <p
                class="inline-block px-3 py-1 rounded-full text-sm font-medium"
                :class="
                  user?.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                "
              >
                {{ user?.status || "unknown" }}
              </p>
            </div>
            <div class="bg-slate-50 rounded-2xl p-5 border md:col-span-2">
              <p class="text-sm text-slate-500">Created At</p>
              <p class="text-base font-medium">
                {{ user?.created_at ? new Date(user.created_at).toLocaleString() : 'N/A' }}
              </p>
            </div>
          </div>

          <!-- LOADING OVERLAY -->
          <div v-if="loading" class="mt-8 flex justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- MODAL -->
  <div
    v-if="showEditModal"
    class="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
  >
    <div class="min-h-screen flex items-end justify-center p-4">
      <div
        class="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 class="text-2xl font-bold mb-6 text-slate-800">
          Edit Organization Profile
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-slate-600 mb-2">
              Organization Name
            </label>
            <input
              v-model="profileForm.name"
              type="text"
              class="w-full border rounded-lg px-4 py-3"
            />
          </div>
          <div>
            <label class="block text-sm text-slate-600 mb-2">Email</label>
            <input
              v-model="profileForm.email"
              type="email"
              class="w-full border rounded-lg px-4 py-3"
            />
          </div>
          <div>
            <label class="block text-sm text-slate-600 mb-2">Phone</label>
            <input
              v-model="profileForm.phone"
              type="text"
              class="w-full border rounded-lg px-4 py-3"
            />
          </div>
          <div>
            <label class="block text-sm text-slate-600 mb-2">Status</label>
            <select
              v-model="profileForm.status"
              class="w-full border rounded-lg px-4 py-3"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm text-slate-600 mb-2">
              Description
            </label>
            <textarea
              v-model="profileForm.description"
              rows="4"
              class="w-full border rounded-lg px-4 py-3"
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm text-slate-600 mb-2">Address</label>
            <textarea
              v-model="profileForm.address"
              rows="3"
              class="w-full border rounded-lg px-4 py-3"
            />
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button
            @click="closeEditModal"
            class="px-5 py-2 border rounded-lg hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            v-if="organization"
            @click="() => saveProfile('PATCH')"
            class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            v-if="!organization"
            @click="() => saveProfile('POST')"
            class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
        Create Organization
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { auth } from "../../src/auth/firebase";
import { getAuth } from "firebase/auth";
const user = ref(null);
const organization = ref(null);
const showEditModal = ref(false);
const loading = ref(true);

const getFirebaseToken = async () => {
  const authInstance = getAuth();
  let user = authInstance.currentUser;
  if (!user) {
    await new Promise((resolve) => {
      const unsubscribe = authInstance.onAuthStateChanged((u) => {
        user = u;
        unsubscribe();
        resolve();
      });
    });
  }
  if (!user) return null;
  return await user.getIdToken(true);
};
const profileForm = ref({
  id: "",
  name: "",
  phone: "",
  email: "",
  description: "",
  address: "",
  status: "",
  created_at: "",
});

const openEditModal = () => {
  profileForm.value = {
    id: user.value?.id || "",
    name: user.value?.displayName || "",
    phone: user.value?.phoneNumber || "",
    email: user.value?.email || "",
    description: user.value?.description || "",
    address: user.value?.address || "",
    status: user.value?.status || "",
    created_at: user.value?.created_at || "",
  };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const saveProfile = async (method) => {
  try {
    const result = await $fetch("/api/partner/organization", {
      method: method,
      body: profileForm.value,
    });
    console.log("Update thành công:", result);
    showEditModal.value = false;
  } catch (error) {
    console.error("Update thất bại:", error);
    alert("Lỗi khi cập nhật thông tin: " + (error.data?.message || error.message));
  }
};

const loadOrganization = async () => {
  loading.value = true;
  try {
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      user.value = null;
      organization.value = false;
      return;
    }

    // Set default user info from Firebase
    user.value = {
      displayName: currentUser.displayName || "User",
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      phoneNumber: currentUser.phoneNumber,
    };

    const result = await $fetch("/api/partner/organization");
    const data = result.data;

    if (data) {
      user.value = {
        id: data.id,
        displayName: data.name,
        description: data.description,
        address: data.address,
        email: data.email,
        status: data.status,
        created_at: data.created_at,
        phoneNumber: data.phone,
        photoURL: currentUser.photoURL,
      };
      organization.value = true;
    } else {
      organization.value = false;
    }
  } catch (error) {
    console.error("loadOrganization error:", error);
    organization.value = false;
  } finally {
    loading.value = false;
  }
};

onMounted(async() => {
  loadOrganization();

  try{
    const userRoles = await $fetch('/api/auth/user-roles', {
      method: "GET",
  });
  if (Array.isArray(userRoles) && userRoles.includes('admin')) {
      console.log("User has admin role");
    } else {
      return navigateTo('/');
    }
  } catch (error) {
    console.error("Error fetching user roles:", error);
  }
});

watch(showEditModal, async (isOpen, wasOpen) => {
  if (wasOpen && !isOpen) {
    await loadOrganization();
  }
});

</script>
