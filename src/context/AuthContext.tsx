import React, { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "../types/users";
// import { AclResponse } from "../types/acl";
// import { useGetAcl } from "../hooks/acl/useGetAcl";
// import { useGetAclById } from "../hooks/acl/useGetAclById";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  // acl: AclResponse | null;
  login: (tokens: { access: string; refresh: string }, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const { data: aclArray } = useGetAcl(user?.id ?? 0);
  // const acl = aclArray && aclArray.length > 0 ? aclArray[0] : null;
  // const { data } = useGetAclById(user?.id ?? 0);
  // console.log("Get ACL by ID: ", data);

  // Check local storage for token on app load
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = (
    tokens: { access: string; refresh: string },
    userData: User
  ) => {
    localStorage.setItem("accessToken", tokens.access);
    localStorage.setItem("refreshToken", tokens.refresh);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Clear cache on logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    queryClient.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        // acl,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
