// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   changePassword,
//   loginUser,
//   registerUser,
// } from "../services/authService";
// // import { fetchUserProfile } from "../services/userService";
// import { AxiosError } from "axios";
// import { storeAuthTokens } from "../utils/tokenHelper";
// import { useAuth } from "../context/AuthContext";

// export const useRegister = () => {
//   const queryClient = useQueryClient();
//   const { login } = useAuth();

//   return useMutation({
//     mutationFn: registerUser,
//     onSuccess: (data) => {
//       storeAuthTokens(data);
//       queryClient.setQueryData(["userProfile"], data.user); // Put user data in cache
//       login({ access: data.access, refresh: data.refresh }, data.user);
//     },
//   });
// };

// export const useLogin = () => {
//   const queryClient = useQueryClient();
//   const { login } = useAuth();

//   return useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       storeAuthTokens(data);
//       queryClient.setQueryData(["userProfile"], data.user); // Put user data in cache
//       login({ access: data.access, refresh: data.refresh }, data.user);
//     },
//     onError: (error: AxiosError) => {
//       console.log("Login error: ", error);
//       if (error.response?.status === 401) {
//         console.log("شماره تلفن یا رمز عبور اشتباه است!");
//       } else {
//         console.log("خطای ناشناخته‌ای رخ داده است:", error.message);
//       }
//     },
//   });
// };

// export const useChangePassword = () => {
//   return useMutation({
//     mutationFn: changePassword,
//     onSuccess: () => {
//       console.log("Password changed successfully!");
//     },
//     onError: (error: AxiosError) => {
//       console.log("Change password error: ", error);
//       if (error.response?.status === 400) {
//         console.log("رمز عبور قدیمی اشتباه است یا ورودی‌ها معتبر نیستند!");
//       } else if (error.response?.status === 401) {
//         console.log("لطفاً دوباره لاگین کنید!");
//       } else {
//         console.log("خطای ناشناخته:", error.message);
//       }
//     },
//   });
// };

// // export const useUserProfile = () => {
// //   return useQuery({
// //     queryKey: ["userProfile"],
// //     queryFn: fetchUserProfile,
// //     // staleTime: Infinity, // User info won't change until logout
// //     enabled: !!localStorage.getItem("accessToken"),
// //   });
// // };

// // export const useLogout = () => {
// //   const queryClient = useQueryClient();
// //   return () => {
// //     logoutUser();
// //     clearAuthTokens();
// //     queryClient.removeQueries({ queryKey: ["userProfile"] });
// //   };
// // };
