import React, { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useGetUserPermissions } from "../hooks/permissions/useGetUserPermissions";
import { useGetProfile } from "../hooks/profile/useGetProfile";
import { AclProvider } from "../context/AclContext";
import Dots from "../components/Dots/Dots";

interface PrivateRoutesProps {
  children: ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: userPermissionsList, isPending: permissionLoading } =
    useGetUserPermissions();
  const { data: userInfo, isPending: profileLoading } = useGetProfile();

  if (authLoading || permissionLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Dots />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Find the permission record that belongs to the current user
  const matchedPermission = userPermissionsList?.find(
    (item) => item.users?.phone_number === userInfo?.phone_number,
  );

  const userPermissionId = matchedPermission?.id_user_permission
    ? Number(matchedPermission.id_user_permission)
    : null;

  return <AclProvider userId={userPermissionId}>{children}</AclProvider>;
};

export default PrivateRoutes;
