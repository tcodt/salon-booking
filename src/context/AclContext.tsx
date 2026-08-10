/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { useGetProfile } from "../hooks/profile/useGetProfile";
import { useGetUserPermissionsById } from "../hooks/permissions/useGetUserPermissionsById";
import { PermissionsList } from "../types/permissions";

interface AclContextType {
  userPermissions: string[];
  hasPermission: (permission: string | PermissionsList) => boolean;
  role: "admin" | "employee" | "normal-user";
  isOwner: boolean;
  isSuperuser: boolean;
  isLoading: boolean;
}

export interface AclProviderProps {
  children: ReactNode;
  userId: number | null;
}

const AclContext = createContext<AclContextType | undefined>(undefined);

const ADMIN_PERMISSIONS: string[] = Object.values(PermissionsList);

export const AclProvider: React.FC<AclProviderProps> = ({
  children,
  userId,
}) => {
  const {
    data: userInfo,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetProfile();

  const { data: userPermissionData, isLoading: permissionsLoading } =
    useGetUserPermissionsById(userId ?? 0);

  const isOwner = !!userInfo?.is_owner;
  const isSuperuser = !!userInfo?.is_superuser;
  const isAdmin = isOwner || isSuperuser;

  const userPermissions = useMemo<string[]>(() => {
    if (isAdmin) {
      return ADMIN_PERMISSIONS;
    }

    if (userPermissionData?.permissions_display?.length) {
      return userPermissionData.permissions_display.map((p) => p.code);
    }

    // Fallback if the API returns a different shape
    if (Array.isArray((userPermissionData as any)?.permissions)) {
      return (userPermissionData as any).permissions
        .map((p: any) => (typeof p === "string" ? p : p?.code))
        .filter(Boolean);
    }

    return [];
  }, [isAdmin, userPermissionData]);

  const role = useMemo<"admin" | "employee" | "normal-user">(() => {
    if (isAdmin) return "admin";
    if (userPermissions.length > 0) return "employee";
    return "normal-user";
  }, [isAdmin, userPermissions.length]);

  const hasPermission = (permission: string | PermissionsList) => {
    if (isAdmin) return true;
    return userPermissions.includes(permission);
  };

  const isLoading = profileLoading || (!!userId && permissionsLoading);

  // Never return null – keep the tree mounted and expose loading state
  const value: AclContextType = {
    userPermissions,
    hasPermission,
    role,
    isOwner,
    isSuperuser,
    isLoading,
  };

  if (profileError) {
    console.error("Error loading user profile for ACL:", profileError);
  }

  return <AclContext.Provider value={value}>{children}</AclContext.Provider>;
};

export const useAcl = () => {
  const context = useContext(AclContext);
  if (!context) {
    throw new Error("useAcl must be used within AclProvider");
  }
  return context;
};
