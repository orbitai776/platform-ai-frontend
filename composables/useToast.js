import { ref } from 'vue'

const toasts = ref([])
const confirmData = ref(null) // { message, resolve }

export default function useToast() {
  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now()
    toasts.value.push({ id, message, type })

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  const removeToast = (id) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  const askConfirm = (message) => {
    return new Promise((resolve) => {
      confirmData.value = {
        message,
        resolve: (val) => {
          confirmData.value = null
          resolve(val)
        }
      }
    })
  }

  return {
    toasts,
    confirmData,
    success: (msg, duration) => addToast(msg, 'success', duration),
    error: (msg, duration) => addToast(msg, 'error', duration),
    info: (msg, duration) => addToast(msg, 'info', duration),
    warning: (msg, duration) => addToast(msg, 'warning', duration),
    removeToast,
    askConfirm,
  }
}
