import { defineEventHandler, getCookie } from 'h3'
import { jwtDecode } from "jwt-decode"

export default defineEventHandler(async (event) => {
  const accessTokenString: any = getCookie(event, 'accessToken');
  const userProfileString: any = getCookie(event, 'firebaseIdToken');

  try {
    if (!accessTokenString || !userProfileString) {
      return {
        uid: '',
        email: '',
        displayName: '',
        photoURL: ''
      };
    }

    const decodedAccessToken: any = jwtDecode(accessTokenString);
    const decoded: any = jwtDecode(userProfileString);
      
    return {
      uid: decodedAccessToken.uid || '',
      email: decoded.email || '',
      displayName: decoded.name || decoded.full_name || '',
      photoURL: decoded.picture || '' 
    };
  } catch (error) {
    console.error('Error decoding tokens in user-profile:', error);
    return {
      uid: '',
      email: '',
      displayName: '',
      photoURL: ''
    };
  }
});
