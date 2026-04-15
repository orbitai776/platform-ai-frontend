import { defineEventHandler, getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const userRolesString: any = getCookie(event, 'userRoles');

  let userRoles = [];
  
  if (userRolesString) {
    try {
      if (typeof userRolesString === 'string' && userRolesString.startsWith('[')) {
        userRoles = JSON.parse(userRolesString);
      } else if (typeof userRolesString === 'string') {
        userRoles = userRolesString.split(',').map(role => role.trim());
      } else if (Array.isArray(userRolesString)) {
        userRoles = userRolesString;
      }
    } catch (error) {
      console.warn('Error parsing userRoles cookie:', error);
      // Fallback to empty array
      userRoles = [];
    }
  }
  
  return userRoles;
});
