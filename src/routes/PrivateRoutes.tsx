import React, { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useGetUserPermissions } from "../hooks/permissions/useGetUserPermissions";
import { useGetProfile } from "../hooks/profile/useGetProfile";
import { AclProvider } from "../context/AclContext";

interface PrivateRoutesProps {
  children: ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { data: userPermissionId } = useGetUserPermissions();
  const { data: userInfo } = useGetProfile();
  // const token = localStorage.getItem("accessToken");

  if (!isAuthenticated) return <Navigate to="/auth" />;

  const matchedPermission = userPermissionId?.find(
    (item) => item.users.phone_number === userInfo?.phone_number
  );
  const userId = matchedPermission?.id_user_permission;

  return (
    <AclProvider userId={userId ? Number(userId) : null}>
      {children}
    </AclProvider>
  );
};

export default PrivateRoutes;
