<template>
  <div class="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
    <TransitionGroup 
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-x-12 opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform translate-x-12 opacity-0"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-md border min-w-[300px] max-w-md group overflow-hidden"
        :class="bgClasses[toast.type]"
      >
        <!-- Icon -->
        <div class="flex-shrink-0">
          <component :is="icons[toast.type]" class="h-6 w-6" :class="iconClasses[toast.type]" />
        </div>

        <!-- Content -->
        <div class="flex-1">
          <p class="text-sm font-bold font-['Sora'] leading-tight" :class="textClasses[toast.type]">
            {{ toast.message }}
          </p>
        </div>

        <!-- Close Button -->
        <button 
          @click="removeToast(toast.id)"
          class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Progress Bar (Subtle) -->
        <div 
          class="absolute bottom-0 left-0 h-1 bg-current opacity-20 transition-all duration-[3000ms] ease-linear w-full origin-left scale-x-0 animate-progress"
          :class="textClasses[toast.type]"
        ></div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/solid'

const { toasts, removeToast } = useToast()

const bgClasses = {
  success: 'bg-green-50/90 border-green-200/50 text-green-800',
  error: 'bg-red-50/90 border-red-200/50 text-red-800',
  info: 'bg-blue-50/90 border-blue-200/50 text-blue-800',
  warning: 'bg-yellow-50/90 border-yellow-200/50 text-yellow-800'
}

const iconClasses = {
  success: 'text-green-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-yellow-500'
}

const textClasses = {
  success: 'text-green-900',
  error: 'text-red-900',
  info: 'text-blue-900',
  warning: 'text-yellow-900'
}

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  info: InformationCircleIcon,
  warning: ExclamationTriangleIcon
}
</script>

<style scoped>
@keyframes progress {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}
.animate-progress {
  animation: progress 3s linear forwards;
}
</style>
