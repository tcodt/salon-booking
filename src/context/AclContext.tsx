import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { useGetProfile } from "../hooks/profile/useGetProfile";

interface AclContextType {
  userPermissions: string[];
  hasPermission: (permission: string) => boolean;
  role: "admin" | "employee" | "normal-user";
  isOwner: boolean;
  isSuperuser: boolean;
}

export interface AclProviderProps {
  children: ReactNode;
  userId: number | null;
}

const AclContext = createContext<AclContextType | undefined>(undefined);

export const AclProvider: React.FC<AclProviderProps> = ({ children }) => {
  const { data: userInfo, isLoading, error } = useGetProfile();

  const isOwner = !!userInfo?.is_owner;
  const isSuperuser = !!userInfo?.is_superuser;
  const isAdmin = isOwner || isSuperuser;

  const userPermissions = useMemo<string[]>(() => {
    if (isAdmin) {
      return "user_edit,role_edit,appointment_manage_all,appointment_view_all,user_view,settings_edit".split(
        ","
      );
    }
    return [];
  }, [isAdmin]);

  const role = useMemo<"admin" | "employee" | "normal-user">(() => {
    if (isAdmin) return "admin";
    if (userPermissions.length > 0) return "employee";
    return "normal-user";
  }, [isAdmin, userPermissions.length]);

  const hasPermission = (permission: string) => {
    return userPermissions.includes(permission);
  };

  if (isLoading) return null;
  if (error) {
    console.error("Error loading user profile for ACL:", error);
    return null;
  }

  return (
    <AclContext.Provider
      value={{
        userPermissions,
        hasPermission,
        role,
        isOwner,
        isSuperuser,
      }}
    >
      {children}
    </AclContext.Provider>
  );
};

export const useAcl = () => {
  const context = useContext(AclContext);
  if (!context) throw new Error("useAcl must be used within AclProvider");
  return context;
};
