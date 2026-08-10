import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "./fonts.css";
import { createTheme, ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "./context/SidebarContext";

const App: React.FC = () => {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
  });

  const theme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "myCustomFont",
    },
    palette: {
      primary: {
        main: "#f97316",
        contrastText: "#fff",
      },
      secondary: {
        main: "#ea580c",
      },
    },
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <SidebarProvider>
          <AppRoutes />
          <Toaster position="top-center" />
        </SidebarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
