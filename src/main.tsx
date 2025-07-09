import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
// import { ThemeProvider } from "./context/ThemeContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeColorProvider } from "./context/ThemeColor.tsx";
// import { AclProvider } from "./context/AclContext.tsx";
// import { useGetUserPermissions } from "./hooks/permissions/useGetUserPermissions.ts";
// import { useGetProfile } from "./hooks/profile/useGetProfile.ts";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      // cacheTime: 30 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <ThemeColorProvider>
          <App />
        </ThemeColorProvider>
        {/* <ThemeProvider> */}
        {/* <Providers /> */}
        {/* </ThemeProvider> */}
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
