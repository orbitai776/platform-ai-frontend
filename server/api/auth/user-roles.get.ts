import { defineEventHandler, getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const userRolesString: any = getCookie(event, 'userRoles');

  let userRoles = [];
  
  if (userRolesString) {
    try {
      // Thử parse như JSON
      userRoles = JSON.parse(userRolesString);
    } catch (error) {
      // Nếu lỗi, xử lý như string thường "user,partner"
      userRoles = userRolesString.split(',').map(role => role.trim());
    }
  }
  
  return userRoles;
});
