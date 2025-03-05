import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "./fonts.css";
import { createTheme, ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";

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
  });

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <AppRoutes />
          <ToastContainer />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default App;
