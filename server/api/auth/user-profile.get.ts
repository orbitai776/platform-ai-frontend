import { defineEventHandler, getCookie } from 'h3'
import { jwtDecode } from "jwt-decode"



export default defineEventHandler(async (event) => {
  const accessTokenString: any = getCookie(event, 'accessToken');
  const userProfileString: any = getCookie(event, 'firebaseIdToken');

  const decodedAccessToken: any = jwtDecode(accessTokenString);

  const decoded: any = jwtDecode(userProfileString);
    
  return {
    uid: decodedAccessToken.uid || '',
    email: decoded.email || '',
    displayName: decoded.name || decoded.full_name || '',
    // Tạm thời nếu token không chứa ảnh, dùng ảnh mặc định. Bạn có thể lấy từ db sau.
    photoURL: decoded.picture || '' 
  };
});
