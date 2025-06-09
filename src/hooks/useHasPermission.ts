// import { useAuth } from "../context/AuthContext";

// export function useHasPermission(permissionCode: string): boolean {
//   const { acl, user } = useAuth();

//   // اگه کاربر is_owner یا is_staff باشه، دسترسی کامل داره
//   if (user?.is_owner || user?.is_staff) {
//     return true;
//   }

//   // چک کردن پرمیشن با کد
//   return acl?.permissions.some((p) => p.code === permissionCode) || false;
// }
