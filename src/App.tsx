import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "./fonts.css";
import { createTheme, ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";

const App: React.FC = () => {
  // Create RTL cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
  });

  // Create theme with custom font and RTL direction
  const theme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "myCustomFont",
    },
    palette: {
      primary: {
        main: "#f97316", // رنگ نارنجی (orange-500 در Tailwind)
        contrastText: "#fff", // رنگ متن روی پس‌زمینه (سفید برای خوانایی)
      },
      secondary: {
        main: "#ea580c", // یه نارنجی تیره‌تر برای تنوع (اختیاری)
      },
      // action: {
      //   active: "#f97316", // رنگ حالت فعال (مثل کلیک)
      //   hover: "rgba(249, 115, 22, 0.08)", // افکت هاور
      //   selected: "rgba(249, 115, 22, 0.16)", // حالت انتخاب‌شده
      // },
    },
    components: {
      // تنظیم افکت ripple (موج کلیک)
      MuiButton: {
        // styleOverrides: {
        //   root: {
        //     "&:hover": {
        //       backgroundColor: "rgba(249, 115, 22, 0.1)", // هاور دکمه
        //     },
        //     "&:focus": {
        //       backgroundColor: "rgba(249, 115, 22, 0.2)", // فوکوس دکمه
        //     },
        //   },
        // },
        defaultProps: {
          disableRipple: false, // افکت موج رو خاموش نکنید، فقط رنگش رو تغییر بدید
        },
      },
    },
  });

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <SidebarProvider>
              <AppRoutes />
              <Toaster />
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default App;
