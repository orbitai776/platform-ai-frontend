import { defineEventHandler, readBody, setCookie, createError } from 'h3'
import { jwtDecode } from "jwt-decode";

export default defineEventHandler(async (event) => {
  const { idToken } = await readBody(event)

  const response: any = await $fetch(`${process.env.VITE_GATEWAY_URL}/v1/api/auth`, {
    method: 'POST',
    body: { idToken }
  })

  // 1. Decode token to get UID
  const jwtDecoded: any = jwtDecode(response.accessToken);
  const uid = jwtDecoded.uid;

  // 2. Secondary check: Local Blacklist
  try {
    const fs = await import('fs');
    const path = await import('path');
    const BLACKLIST_FILE = path.join(process.cwd(), 'suspended_users.json');
    
    console.log(`[LOGIN BLACKLIST] Reading file from: ${BLACKLIST_FILE}`);
    
    if (fs.existsSync(BLACKLIST_FILE)) {
      const blacklist = JSON.parse(fs.readFileSync(BLACKLIST_FILE, 'utf-8'));
      
      // Check if blocked (supports both array and object formats)
      const isBlocked = Array.isArray(blacklist) ? blacklist.includes(uid) : !!blacklist[uid];
      
      if (isBlocked) {
        const status = Array.isArray(blacklist) ? 'suspended' : (blacklist[uid] || 'suspended');
        console.log(`[LOGIN BLACKLIST] BLOCKED access for UID: ${uid} (Status: ${status})`);
        throw createError({
          statusCode: 403,
          statusMessage: `Tài khoản của bạn đã bị ${status === 'deleted' ? 'xóa' : 'khóa'}. Vui lòng liên hệ quản trị viên.`
        })
      }
    }
  } catch (err: any) {
    if (err.statusCode === 403) throw err;
    console.error('[LOGIN BLACKLIST ERROR]:', err.message);
  }

  // 3. Optional: Access test for standard user APIs (keep as fallback)
  try {
    const testFetch: any = await $fetch(`${process.env.VITE_GATEWAY_URL}/v1/api/partner/ai-services-all`, {
      headers: { 
        Authorization: `Bearer ${response.accessToken}`,
        'Cache-Control': 'no-cache'
      }
    });
  } catch (err: any) {
    // If Gateway returns 403 for even standard APIs, block them too
    if (err.statusCode === 403) {
       throw createError({
        statusCode: 403,
        statusMessage: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.'
      })
    }
  }


  setCookie(event, 'firebaseIdToken', idToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 1000
  })

  // Set HttpOnly cookie
  setCookie(event, 'accessToken', response.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 1000
  })

  // Extract roles and profile from the already decoded token
  const userRoles = jwtDecoded.roles || [];
  setCookie(event, 'userRoles', userRoles, {
    httpOnly: false, // Must be false for middleware/client to read
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 1000
  })

  const userProfile = jwtDecoded || [];
  setCookie(event, 'userProfile', userProfile, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 1000
  })

  // Trả về data user (không có token)
  return {
    success: true,
    user: response.userUsingCache
  }
})