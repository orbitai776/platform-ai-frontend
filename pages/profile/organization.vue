<template>
  <div class="flex h-screen bg-[#0a0a0a] text-white selection:bg-cyan-500/30 overflow-hidden font-['Inter'] relative">
    
    <!-- VERTICAL SIDEBAR (Synced with Partner Dashboard) -->
    <nav class="h-screen w-64 border-r border-white/10 bg-black/60 backdrop-blur-2xl flex flex-col p-4 gap-2 flex-shrink-0 z-20">
      <!-- Sidebar Header -->
      <div class="flex items-center gap-3 px-2 py-4 mb-4">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <span class="material-symbols-outlined text-black font-bold">hexagon</span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-bold text-white leading-tight font-['Space_Grotesk']">Orbit Enterprise</span>
          <span class="text-[10px] text-white/40 uppercase tracking-widest font-bold">Partner Console</span>
        </div>
      </div>

      <!-- Main Navigation -->
      <div class="flex-1 flex flex-col gap-1 font-['Space_Grotesk'] text-sm">
        <NuxtLink to="/partner" class="text-white/40 hover:bg-white/5 hover:text-white transition-all flex items-center gap-3 px-3 py-2.5 rounded-xl">
          <span class="material-symbols-outlined text-lg">dashboard</span>
          Dashboard
        </NuxtLink>
        <a v-for="item in ['Analytics', 'Models', 'Deployments']" :key="item" href="#" 
          class="text-white/40 hover:bg-white/5 hover:text-white transition-all flex items-center gap-3 px-3 py-2.5 rounded-xl">
          <span class="material-symbols-outlined text-lg">{{ item.toLowerCase() === 'analytics' ? 'insights' : item.toLowerCase() === 'models' ? 'memory' : 'rocket_launch' }}</span>
          {{ item }}
        </a>
        <div class="h-px bg-white/5 my-2"></div>
        <NuxtLink to="/profile" class="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.1)] flex items-center gap-3 px-3 py-2.5 transition-all">
          <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">person</span>
          Account Settings
        </NuxtLink>
      </div>

      <!-- Footer Navigation -->
      <div class="mt-auto flex flex-col gap-1 border-t border-white/5 pt-4 font-['Space_Grotesk'] text-sm">
        <button @click="signOutUser" class="text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-all flex items-center gap-3 px-3 py-2.5 rounded-xl">
          <span class="material-symbols-outlined text-lg">logout</span>
          Sign Out
        </button>
      </div>
    </nav>

    <!-- MAIN CONTENT AREA -->
    <div class="flex-1 flex flex-col min-w-0 relative overflow-hidden">
      <!-- Ambient Background Glows -->
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <!-- TOP BAR -->
      <header class="bg-black/20 backdrop-blur-md w-full h-16 border-b border-white/5 flex justify-between items-center px-8 flex-shrink-0 z-10">
        <div class="flex items-center gap-4">
          <h2 class="font-['Space_Grotesk'] text-lg font-bold text-white/80">Organization Registry</h2>
        </div>

        <div class="flex items-center gap-4">
          <button class="text-white/40 hover:text-white transition-colors relative">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <div class="h-8 w-[1px] bg-white/10 mx-2"></div>
          <div class="flex items-center gap-3">
             <div class="text-right hidden md:block">
                <p class="text-[10px] font-bold text-white uppercase tracking-widest leading-none mb-1">{{ user?.displayName || 'Org Manager' }}</p>
                <p class="text-[9px] text-white/40 uppercase font-medium">Zenith Partner</p>
             </div>
             <img :src="user?.photoURL || 'https://ui-avatars.com/api/?name=Partner&background=0A0A0A&color=fff'" 
              class="w-8 h-8 rounded-full border border-white/10 bg-black object-cover" />
          </div>
        </div>
      </header>

      <!-- SCROLLABLE CANVAS -->
      <main class="flex-1 overflow-y-auto p-10 z-0">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          
          <!-- Left Column: Registry Snapshot -->
          <aside class="w-full md:w-1/3 flex flex-col gap-8">
            <!-- Navigation Sub-tabs -->
            <div class="flex gap-3 mb-2">
              <NuxtLink to="/profile" class="flex-1 text-center py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white">
                User Identity
              </NuxtLink>
              <NuxtLink to="/profile/organization" class="flex-1 text-center py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                Organization
              </NuxtLink>
            </div>

            <!-- Organization Overview Card -->
            <div class="glass-card rounded-2xl p-8 flex flex-col items-center text-center">
              <div class="relative mb-6">
                <div class="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <img v-if="user?.photoURL" :src="user.photoURL" class="w-24 h-24 rounded-full object-cover relative z-10 border-2 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]" alt="Org Avatar" />
                <div v-else class="w-24 h-24 rounded-full bg-slate-900 border-2 border-white/10 flex items-center justify-center text-3xl font-bold text-white relative z-10">
                  {{ user?.displayName?.charAt(0) || 'O' }}
                </div>
                <button @click="openEditModal" class="absolute bottom-0 right-0 bg-[#2a2a2a] border border-white/20 rounded-full p-1.5 hover:bg-purple-500/20 hover:border-purple-500 transition-colors z-20 group">
                  <span class="material-symbols-outlined text-white group-hover:text-purple-400 text-xs">edit</span>
                </button>
              </div>
              
              <h1 class="text-2xl font-bold font-['Space_Grotesk'] text-white mb-2 leading-tight">{{ user?.displayName || 'Unnamed Org' }}</h1>
              <p class="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 mb-6" :class="user?.status === 'active' ? 'text-cyan-400' : 'text-white/20'">
                <span class="w-1.5 h-1.5 rounded-full" :class="user?.status === 'active' ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]' : 'bg-white/20'"></span>
                {{ user?.status || 'Unknown' }} Status
              </p>

              <div class="w-full grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div class="flex flex-col items-center">
                  <span class="text-[8px] text-white/30 uppercase tracking-widest mb-1 font-bold">Nodes</span>
                  <span class="text-xl font-bold text-cyan-400">12</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="text-[8px] text-white/30 uppercase tracking-widest mb-1 font-bold">Index</span>
                  <span class="text-xl font-bold text-purple-400">A+</span>
                </div>
              </div>
            </div>

            <!-- Action Area -->
            <div class="glass-card rounded-2xl p-6">
               <button v-if="!organization" @click="openEditModal" class="w-full luminous-btn py-3 rounded-xl text-[10px] font-bold text-black uppercase tracking-widest">
                Initialize Registry
              </button>
              <div v-else class="space-y-4">
                 <div class="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span class="text-white/30">Compliance</span>
                    <span class="text-cyan-400">Verified Tier 1</span>
                 </div>
                 <div class="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div class="bg-cyan-400 h-full w-full shadow-[0_0_8px_rgba(0,240,255,0.5)]"></div>
                 </div>
              </div>
            </div>
          </aside>

          <!-- Right Column: Registry Details -->
          <div class="w-full md:w-2/3 flex flex-col gap-8">
            <div class="glass-card rounded-2xl p-8">
              <div class="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                <h2 class="text-xl font-bold text-white font-['Space_Grotesk']">Registry Parameters</h2>
                <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="field in [
                  { label: 'Legal Entity Name', value: user?.displayName },
                  { label: 'Official Email', value: user?.email },
                  { label: 'Neural Link (Phone)', value: user?.phoneNumber },
                  { label: 'Registry Status', value: user?.status }
                ]" :key="field.label" class="flex flex-col gap-2">
                  <label class="text-[9px] text-white/30 uppercase tracking-widest font-bold">{{ field.label }}</label>
                  <div class="bg-black/30 border border-white/10 rounded-xl p-4 text-sm text-white/80 font-medium">
                    {{ field.value || 'N/A' }}
                  </div>
                </div>
                
                <div class="md:col-span-2 flex flex-col gap-2">
                  <label class="text-[9px] text-white/30 uppercase tracking-widest font-bold">Mission Description</label>
                  <div class="bg-black/30 border border-white/10 rounded-xl p-4 text-sm text-white/60 leading-relaxed min-h-[100px]">
                    {{ user?.description || 'No mission profile recorded.' }}
                  </div>
                </div>

                <div class="md:col-span-2 flex flex-col gap-2">
                  <label class="text-[9px] text-white/30 uppercase tracking-widest font-bold">Physical Coordinates (Address)</label>
                  <div class="bg-black/30 border border-white/10 rounded-xl p-4 text-sm text-white/60">
                    {{ user?.address || 'Decentralized Operation' }}
                  </div>
                </div>
                
                <div class="md:col-span-2 flex justify-end mt-4">
                  <button @click="openEditModal" class="luminous-btn px-8 py-3 rounded-xl text-[10px] font-bold text-black uppercase tracking-widest flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">edit_note</span>
                    Update Registry
                  </button>
                </div>
              </div>
            </div>

            <!-- Bento Operations Card -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div class="glass-card rounded-2xl p-6">
                  <h3 class="text-[9px] text-white/30 uppercase tracking-widest mb-4 font-bold">Network Access</h3>
                  <div class="space-y-3">
                     <div v-for="i in 3" :key="i" class="flex items-center justify-between">
                        <span class="text-xs text-white/60">Gateway {{ i }}</span>
                        <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                     </div>
                  </div>
               </div>
               <div class="glass-card rounded-2xl p-6 flex flex-col justify-between">
                  <h3 class="text-[9px] text-white/30 uppercase tracking-widest mb-4 font-bold">Operational Timeline</h3>
                  <div class="text-left">
                     <p class="text-[8px] text-white/20 uppercase font-bold tracking-widest">Established</p>
                     <p class="text-xs text-purple-400 font-bold">{{ user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A' }}</p>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>

    <!-- CONFIG MODAL (Synced Style) -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-6 overflow-y-auto">
      <div class="glass-card w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative border-purple-500/20 max-h-[90vh] overflow-y-auto">
        <button @click="closeEditModal" class="absolute top-6 right-6 text-white/20 hover:text-white transition-colors">
           <span class="material-symbols-outlined">close</span>
        </button>
        
        <h2 class="text-2xl font-bold mb-2 font-['Space_Grotesk'] text-white">Registry Configuration</h2>
        <p class="text-sm text-white/40 mb-8">Update organizational parameters across the Orbit network.</p>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-[10px] text-white/30 uppercase tracking-widest font-bold">Entity Name</label>
            <input v-model="profileForm.name" type="text" class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 outline-none transition-all shadow-inner" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[10px] text-white/30 uppercase tracking-widest font-bold">Email Vector</label>
            <input v-model="profileForm.email" type="email" class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 outline-none transition-all shadow-inner" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[10px] text-white/30 uppercase tracking-widest font-bold">Phone Link</label>
            <input v-model="profileForm.phone" type="text" class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 outline-none transition-all shadow-inner" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[10px] text-white/30 uppercase tracking-widest font-bold">Operational Status</label>
            <select v-model="profileForm.status" class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 outline-none cursor-pointer">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div class="md:col-span-2 flex flex-col gap-2">
            <label class="text-[10px] text-white/30 uppercase tracking-widest font-bold">Mission Description</label>
            <textarea v-model="profileForm.description" rows="3" class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 outline-none transition-all resize-none"></textarea>
          </div>
          <div class="md:col-span-2 flex flex-col gap-2">
            <label class="text-[10px] text-white/30 uppercase tracking-widest font-bold">Physical Address</label>
            <textarea v-model="profileForm.address" rows="2" class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 outline-none transition-all resize-none"></textarea>
          </div>
        </div>

        <div class="flex gap-4 mt-10">
          <button @click="closeEditModal" class="flex-1 py-3 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-white/5 transition-all">
            Discard
          </button>
          <button v-if="organization" @click="() => saveProfile('PATCH')" class="flex-1 luminous-btn py-3 rounded-xl text-[10px] font-bold text-black uppercase tracking-widest">
            Sync Registry
          </button>
          <button v-if="!organization" @click="() => saveProfile('POST')" class="flex-1 luminous-btn py-3 rounded-xl text-[10px] font-bold text-black uppercase tracking-widest">
            Initialize Registry
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { auth, signOut } from "~/src/auth/firebase";

const toast = useToast()
const user = ref(null);
const organization = ref(null);
const showEditModal = ref(false);
const loading = ref(true);

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
    await $fetch("/api/partner/organization", {
      method: method,
      body: profileForm.value,
    });
    toast.success("Registry updated successfully!");
    showEditModal.value = false;
  } catch (error) {
    console.error("Update failed:", error);
    toast.error("Lỗi khi cập nhật Registry.");
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
    console.error("Load error:", error);
    organization.value = false;
  } finally {
    loading.value = false;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    await $fetch("/api/auth/logout", {
      method: "GET",
    });
    navigateTo("/login");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

onMounted(async() => {
  await loadOrganization();
  try{
    const userRoles = await $fetch('/api/auth/user-roles', { method: "GET" });
    if (!Array.isArray(userRoles) || !userRoles.includes('admin')) {
      return navigateTo('/');
    }
  } catch (err) {
    console.error("Auth error:", err);
  }
});

watch(showEditModal, async (isOpen, wasOpen) => {
  if (wasOpen && !isOpen) {
    await loadOrganization();
  }
});
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  pointer-events: none;
}

.luminous-btn {
  background: linear-gradient(90deg, #00f0ff, #7701d0);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
  transition: all 0.3s ease;
  border: none;
}

.luminous-btn:hover {
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.5);
  transform: translateY(-1px);
  filter: brightness(1.1);
}

select option {
  background: #1a1a1a;
  color: white;
}
</style>
