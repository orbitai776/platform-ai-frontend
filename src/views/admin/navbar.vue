<template>
  <Disclosure as="nav" class="relative z-50 bg-white dark:bg-[#09090B] border-b border-slate-200 dark:border-white/10 transition-colors duration-500" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white focus:outline-none transition-colors">
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
             <div class="text-xl font-bold bg-gradient-to-r from-neon-cyan to-deep-purple bg-clip-text text-transparent">Orbit AI</div>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href"
                :class="[item.current ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white', 'rounded-md px-3 py-2 text-sm font-bold uppercase tracking-widest transition-all']"
                :aria-current="item.current ? 'page' : undefined">
                {{ item.name }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Theme Toggle -->
          <button @click="toggleTheme" type="button" class="relative rounded-xl p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all mr-2">
            <span class="sr-only">Toggle theme</span>
            <span v-if="isDark" class="material-symbols-outlined text-[20px]">light_mode</span>
            <span v-else class="material-symbols-outlined text-[20px]">dark_mode</span>
          </button>

          <button type="button" class="relative rounded-xl p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
            <span class="absolute -inset-1.5"></span>
            <span class="sr-only">View notifications</span>
            <BellIcon class="size-6" aria-hidden="true" />
          </button>

          <!-- Profile Dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton class="relative flex rounded-full border border-slate-200 dark:border-white/10 p-0.5 transition-colors">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img
                  class="size-8 rounded-full bg-slate-200 dark:bg-gray-800"
                  :src="user?.photoURL || 'https://ui-avatars.com/api/?name=Admin&background=374151&color=fff'"
                  :alt="user?.displayName || 'User'"
                />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl bg-white dark:bg-gray-900 py-2 shadow-2xl border border-slate-200 dark:border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="px-4 py-3 border-b border-slate-100 dark:border-white/10 mb-1">
                  <p class="text-sm text-slate-900 dark:text-white font-bold truncate">{{ user?.displayName || 'Administrator' }}</p>
                  <p class="text-[10px] text-slate-400 dark:text-gray-500 truncate uppercase tracking-widest">{{ user?.email }}</p>
                </div>
                <MenuItem v-slot="{ active }">
                  <NuxtLink to="/profile" :class="[active ? 'bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-gray-400', 'block px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors no-underline']">Your profile</NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink to="/" :class="[active ? 'bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-gray-400', 'block px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors no-underline']">Public View</NuxtLink>
                </MenuItem>
                <div class="h-px bg-slate-100 dark:bg-white/10 my-1"></div>
                <MenuItem v-slot="{ active }">
                  <button
                    @click="handleLogout"
                    :class="[active ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'text-rose-500/70', 'block w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors']"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3 bg-white dark:bg-black/50 backdrop-blur-md">
        <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href"
          :class="[item.current ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white', 'block rounded-md px-3 py-2 text-base font-bold uppercase tracking-widest']"
          :aria-current="item.current ? 'page' : undefined">
          {{ item.name }}
        </NuxtLink>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '~/src/composables/useTheme'
import { auth, signOut } from '~/src/auth/firebase.js'

const { theme, isDark, toggleTheme } = useTheme()
const route = useRoute()
const user = ref(null)

onMounted(() => {
  auth.onAuthStateChanged((currentUser) => {
    user.value = currentUser
  })
})

const navigation = computed(() => [
  { name: 'Dashboard', href: '/admin', current: route.path === '/admin' },
  { name: 'Organizations', href: '/admin/organizations', current: route.path.startsWith('/admin/organizations') },
  { name: 'Services', href: '/admin/services', current: route.path.startsWith('/admin/services') },
  { name: 'Users', href: '/admin/users', current: route.path.startsWith('/admin/users') },
])

const handleLogout = async () => {
  try {
    await signOut(auth);
    navigateTo('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>