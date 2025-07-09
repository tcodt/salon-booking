import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useGetUserPermissionsById } from "../hooks/permissions/useGetUserPermissionsById";

interface AclContextType {
  userPermissions: string[];
  hasPermission: (permission: string) => boolean;
}

interface AclProviderProps {
  children: React.ReactNode;
  userId?: number | null;
}

const AclContext = createContext<AclContextType | undefined>(undefined);

export const AclProvider: React.FC<AclProviderProps> = ({
  children,
  userId,
}) => {
  const { data: userPermissionsData, error: permissionsError } =
    useGetUserPermissionsById(userId ?? 0);

  console.log(userPermissionsData);

  const userPermissions = useMemo<string[]>(() => {
    return userId && userPermissionsData?.permissions_display
      ? userPermissionsData?.permissions_display.map((p) => p.code)
      : [];
  }, [userId, userPermissionsData?.permissions_display]);

  const hasPermission = (permission: string) => {
    return userPermissions.includes(permission);
  };

  // لاگ کردن نقش کاربر
  useEffect(() => {
    if (userId) {
      console.log(`User ID: ${userId}`);
      console.log("User Permissions:", userPermissions);
      const role =
        userPermissions.length > 0
          ? userPermissions.includes("user_edit") ||
            userPermissions.includes("role_edit")
            ? "مدیر"
            : "کاربر معمولی"
          : "بدون نقش";
      console.log(`نقش کاربر (${userId}): ${role}`);
    }
    if (permissionsError) {
      console.error("Error fetching permissions:", permissionsError);
    }
  }, [userId, userPermissions, permissionsError]);

  if (userId === null) {
    return <>{children}</>;
  }

  return (
    <AclContext.Provider value={{ userPermissions, hasPermission }}>
      {children}
    </AclContext.Provider>
  );
};

export const useAcl = () => {
  const context = useContext(AclContext);
  if (!context) {
    throw new Error("useAcl must be used within an AclProvider");
  }
  return context;
};
