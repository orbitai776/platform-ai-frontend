<template>
  <div class="flex h-screen bg-slate-50 dark:bg-[#09090B] text-slate-900 dark:text-white selection:bg-cyan-500/30 overflow-hidden font-['Inter'] relative transition-colors duration-500">
    
    <!-- VERTICAL SIDEBAR -->
    <nav class="h-screen w-64 border-r border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur-2xl flex flex-col p-4 gap-2 flex-shrink-0 z-20 transition-colors">
      <!-- Sidebar Header -->
      <div class="flex items-center gap-3 px-2 py-4 mb-4">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg dark:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <span class="material-symbols-outlined text-white dark:text-black font-bold">hexagon</span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-bold text-slate-900 dark:text-white leading-tight font-['Space_Grotesk'] transition-colors">Orbit Enterprise</span>
          <span class="text-[10px] text-slate-400 dark:text-white/40 uppercase tracking-widest font-bold transition-colors">Partner Console</span>
        </div>
      </div>

      <!-- Main Navigation -->
      <div class="flex-1 flex flex-col gap-1 font-['Space_Grotesk'] text-sm">
        <button v-for="nav in mainNav" :key="nav.id"
          @click="activeTab = nav.id" 
          :class="activeTab === nav.id ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' : 'text-slate-500 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/5 border-transparent'"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border mb-2 group">
          <span class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform" :style="activeTab === nav.id ? 'font-variation-settings: \'FILL\' 1;' : ''">{{ nav.icon }}</span>
          <span class="text-xs font-bold uppercase tracking-widest">{{ nav.label }}</span>
        </button>

        <div class="h-px w-full bg-slate-200 dark:bg-white/5 my-4"></div>

        <button v-for="nav in disabledNav" :key="nav.label" disabled class="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent opacity-30 cursor-not-allowed mb-2 group">
          <span class="material-symbols-outlined text-lg">{{ nav.icon }}</span>
          <span class="text-xs font-bold uppercase tracking-widest">{{ nav.label }}</span>
        </button>
      </div>

      <!-- Footer Navigation -->
      <div class="mt-auto flex flex-col gap-1 border-t border-slate-100 dark:border-white/5 pt-4 font-['Space_Grotesk'] text-sm">
        <button @click="handleLogout" class="text-rose-500/60 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all flex items-center gap-3 px-3 py-2.5 rounded-xl">
          <span class="material-symbols-outlined text-lg">logout</span>
          Sign Out
        </button>
      </div>
    </nav>

    <!-- MAIN CONTENT AREA -->
    <div class="flex-1 flex flex-col min-w-0 relative overflow-hidden">
      <!-- Ambient Background Glows -->
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <!-- SHOOTING STARS (Only in dark mode) -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div v-for="star in stars" :key="star.id" class="shooting-star hidden dark:block" 
          :style="{ top: star.top, left: star.left, animationDelay: star.delay, animationDuration: star.duration }"></div>
      </div>

      <!-- TOP BAR -->
      <header class="bg-white/40 dark:bg-black/20 backdrop-blur-md w-full h-16 border-b border-slate-100 dark:border-white/5 flex justify-between items-center px-8 flex-shrink-0 z-10 transition-colors">
        <div class="flex items-center gap-4">
          <h2 class="font-['Space_Grotesk'] text-lg font-bold text-slate-700 dark:text-white/80 uppercase tracking-widest transition-colors">
            {{ activeTitle }}
          </h2>
        </div>

        <div class="flex items-center gap-4">
          <div class="h-8 w-[1px] bg-slate-200 dark:bg-white/10 mx-2"></div>
          <div class="flex items-center gap-3">
             <div class="text-right hidden md:block">
                <p class="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest leading-none mb-1">{{ profile?.displayName || 'Operator' }}</p>
                <p class="text-[9px] text-slate-400 dark:text-white/40 uppercase font-medium">Zenith Partner</p>
             </div>
             <img :src="profile?.photoURL || 'https://ui-avatars.com/api/?name=Partner&background=0A0A0A&color=fff'" 
              class="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black object-cover" />
          </div>
        </div>
      </header>

      <!-- SCROLLABLE CANVAS -->
      <main class="flex-1 overflow-y-auto p-10 z-0 relative">
        <div v-if="activeTab === 'billing'" class="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20" style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 50px 50px;"></div>

        <div class="max-w-6xl mx-auto relative z-10">
          <PartnerOverview v-if="activeTab === 'overview'" />
          <PartnerOrganization v-if="activeTab === 'organization'" :orgData="orgData" :profile="profile" :loading="loading" @edit="openEditModal" />
          <PartnerBilling v-if="activeTab === 'billing'" @topup="showTopupModal = true" />
          <PartnerAIConfig v-if="activeTab === 'ai-config'" @save="saveAIConfig" />
        </div>
      </main>
    </div>

    <!-- MODALS -->
    <div v-if="showEditModal" class="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-6">
      <div class="bg-white dark:bg-[#1a1a1a] w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative border border-slate-200 dark:border-purple-500/20">
        <button @click="closeEditModal" class="absolute top-6 right-6 text-slate-400 dark:text-white/20 hover:text-slate-900 dark:hover:text-white transition-colors">
           <span class="material-symbols-outlined">close</span>
        </button>
        <h2 class="text-2xl font-bold mb-2 font-['Space_Grotesk'] text-slate-900 dark:text-white">Registry Configuration</h2>
        <div class="grid md:grid-cols-2 gap-6 mt-8">
          <div v-for="f in [{label:'Entity Name',k:'name',t:'text'}, {label:'Email Vector',k:'email',t:'email'}, {label:'Phone Link',k:'phone',t:'text'}]" :key="f.k" class="flex flex-col gap-2">
            <label class="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest font-bold">{{f.label}}</label>
            <input v-model="profileForm[f.k]" :type="f.t" class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 outline-none transition-all" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest font-bold">Operational Status</label>
            <select v-model="profileForm.status" class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none cursor-pointer appearance-none">
              <option value="active">Active</option><option value="inactive">Inactive</option><option value="pending">Pending</option>
            </select>
          </div>
          <div class="md:col-span-2 flex flex-col gap-2">
            <label class="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest font-bold">Mission Description</label>
            <textarea v-model="profileForm.description" rows="3" class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none resize-none"></textarea>
          </div>
          <div class="md:col-span-2 flex flex-col gap-2">
            <label class="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest font-bold">Physical Address</label>
            <textarea v-model="profileForm.address" rows="2" class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none resize-none"></textarea>
          </div>
        </div>
        <div class="flex gap-4 mt-10">
          <button @click="closeEditModal" class="flex-1 py-3 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">Discard</button>
          <button @click="saveProfile" class="flex-1 luminous-btn py-3 rounded-xl text-[10px] font-bold text-white dark:text-black uppercase tracking-widest">
            {{ isOrgExists ? 'Update Registry' : 'Initialize Registry' }}
          </button>
        </div>
      </div>
    </div>

    <BillingTopupModal v-if="showTopupModal" @close-modal="showTopupModal = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth, signOut } from '~/src/auth/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import PartnerOverview from '~/components/partner/PartnerOverview.vue'
import PartnerOrganization from '~/components/partner/PartnerOrganization.vue'
import PartnerBilling from '~/components/partner/PartnerBilling.vue'
import PartnerAIConfig from '~/components/partner/PartnerAIConfig.vue'

// TABS & UI STATE
const route = useRoute()
const router = useRouter()
const activeTab = ref(route.query.tab || 'overview')
const showEditModal = ref(false)
const showTopupModal = ref(false)
const profile = ref(null)
const orgData = ref(null)
const isOrgExists = ref(false)
const loading = ref(false)

// Watch activeTab changes and update URL
watch(activeTab, (newTab) => {
  router.push({ query: { ...route.query, tab: newTab } })
})

const mainNav = [
  { id: 'overview', label: 'Dashboard', icon: 'dashboard' },
  { id: 'organization', label: 'Organization', icon: 'corporate_fare' },
  { id: 'billing', label: 'Billing & Credits', icon: 'payments' },
  { id: 'ai-config', label: 'AI Configuration', icon: 'psychology_alt' },
]

const disabledNav = [
  { label: 'Analytics', icon: 'query_stats' },
  { label: 'Models', icon: 'model_training' },
]

const activeTitle = computed(() => {
  const titles = {
    overview: 'System Overview',
    organization: 'Organization Registry',
    'ai-config': 'Resource Allocation',
    billing: 'Billing & Operations'
  }
  return titles[activeTab.value] || ''
})

// FORM STATE
const profileForm = ref({ id: "", name: "", phone: "", email: "", description: "", address: "", status: "pending" })

// SHOOTING STARS
const stars = ref(Array.from({ length: 6 }, (_, i) => ({
  id: i, top: `${Math.random() * 50}%`, left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 10}s`, duration: `${2 + Math.random() * 3}s`
})));

// METHODS
const loadOrganization = async () => {
  loading.value = true;
  try {
    const result = await $fetch("/api/partner/organization");
    if (result.data) {
      orgData.value = result.data;
      isOrgExists.value = true;
    } else {
      orgData.value = null;
      isOrgExists.value = false;
    }
  } catch (err) { 
    console.error("Org load failed:", err);
    orgData.value = null;
    isOrgExists.value = false;
  } finally {
    loading.value = false;
  }
}

const openEditModal = () => {
  profileForm.value = {
    id: orgData.value?.id || "",
    name: orgData.value?.name || "",
    phone: orgData.value?.phone || "",
    email: orgData.value?.email || "",
    description: orgData.value?.description || "",
    address: orgData.value?.address || "",
    status: orgData.value?.status || "pending",
  };
  showEditModal.value = true;
};

const closeEditModal = () => { showEditModal.value = false; };

const saveProfile = async () => {
  try {
    const method = isOrgExists.value ? 'PATCH' : 'POST';
    await $fetch("/api/partner/organization", { method: method, body: profileForm.value });
    await loadOrganization();
    showEditModal.value = false;
  } catch (err) { console.error("Save failed:", err); }
};

const saveAIConfig = () => {
  console.log("AI Config Saved Locally");
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    await $fetch('/api/auth/logout', { method: "GET" });
    navigateTo('/login');
  } catch (err) { console.error("Logout failed:", err); }
};

// LIFECYCLE
onMounted(async () => {
  if (!process.client) return;
  onAuthStateChanged(auth, async (user) => {
    if (!user) return navigateTo('/login');
    profile.value = user;
    await loadOrganization();
  });
});
</script>

<style scoped>
.luminous-btn {
  background: linear-gradient(90deg, #00f0ff, #7701d0);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
  transition: all 0.3s ease;
}

.luminous-btn:hover {
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.4);
}

.shooting-star {
  position: absolute;
  width: 150px;
  height: 2px;
  background: linear-gradient(90deg, rgba(0, 240, 255, 0.4), transparent);
  transform: rotate(-45deg);
  opacity: 0;
  animation: shooting-star-anim linear infinite;
}

@keyframes shooting-star-anim {
  0% { transform: rotate(-45deg) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  30% { transform: rotate(-45deg) translateX(-1000px); opacity: 0; }
  100% { transform: rotate(-45deg) translateX(-1000px); opacity: 0; }
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.05); border-radius: 10px; }
.dark ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
::-webkit-scrollbar-thumb:hover { background: rgba(0, 240, 255, 0.3); }

select option { background: white; color: black; }
.dark select option { background: #1a1a1a; color: white; }
</style>