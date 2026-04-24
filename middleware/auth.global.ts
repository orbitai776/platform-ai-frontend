import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  // Skip if already on login page
  if (to.path === '/login') return;

  // 1. Get user roles from cookie
  const userRoles = useCookie('userRoles')
  const roles = (userRoles.value as string[]) || []

  // 2. Protect /admin routes
  if (to.path.startsWith('/admin')) {
    if (!roles.includes('admin')) {
      console.warn('[SECURITY] Non-admin tried to access admin route:', to.path)
      return navigateTo('/partner')
    }
  }

  // 3. Protect /partner routes (optional but good practice)
  if (to.path.startsWith('/partner')) {
    if (!roles.includes('partner') && !roles.includes('admin')) {
        return navigateTo('/login')
    }
  }
})
