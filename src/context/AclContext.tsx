import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useGetUserPermissionsById } from "../hooks/permissions/useGetUserPermissionsById";

interface AclContextType {
  userPermissions: string[];
  hasPermission: (permission: string) => boolean;
  role: string;
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

  const userPermissions = useMemo<string[]>(() => {
    return userId && userPermissionsData?.permissions_display
      ? userPermissionsData?.permissions_display.map((p) => p.code)
      : [];
  }, [userId, userPermissionsData?.permissions_display]);

  const role = useMemo(() => {
    if (!userId || userPermissions.length === 0) return "normal-user";
    if (
      userPermissions.includes("user_edit") ||
      userPermissions.includes("role_edit")
    )
      return "admin";
    return "employee";
  }, [userId, userPermissions]);

  const hasPermission = (permission: string) => {
    return userPermissions.includes(permission);
  };

  useEffect(() => {
    // if (userId) {
    //   console.log(`User ID: ${userId}`);
    //   console.log("User Permissions:", userPermissions);
    //   console.log(`نقش کاربر (${userId}): ${role}`);
    // }
    if (permissionsError) {
      console.error("Error fetching permissions:", permissionsError);
    }
  }, [userId, userPermissions, permissionsError, role]);

  return (
    <AclContext.Provider value={{ userPermissions, hasPermission, role }}>
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
