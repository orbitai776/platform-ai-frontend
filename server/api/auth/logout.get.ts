import { defineEventHandler, setCookie } from 'h3'
import { jwtDecode } from "jwt-decode";

export default defineEventHandler(async (event) => {
  
  setCookie(event, 'firebaseIdToken', '', { maxAge: 0, path: '/' });
  setCookie(event, 'accessToken', '', { maxAge: 0, path: '/' });
  setCookie(event, 'userRoles', '', { maxAge: 0, path: '/' });
  setCookie(event, 'userProfile', '', { maxAge: 0, path: '/' });

  // Trả về data user (không có token)
  return {
    success: true,
    message: "Logout successful"
  }
})