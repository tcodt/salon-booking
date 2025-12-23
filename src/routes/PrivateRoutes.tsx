import React, { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useGetUserPermissions } from "../hooks/permissions/useGetUserPermissions";
import { useGetProfile } from "../hooks/profile/useGetProfile";
import { AclProvider } from "../context/AclContext"; // ایمپورت درست
import Dots from "../components/Dots/Dots";

interface PrivateRoutesProps {
  children: ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { data: userPermissionId, isPending: permissionLoading } =
    useGetUserPermissions();
  const { data: userInfo, isPending: profileLoading } = useGetProfile();

  if (permissionLoading || profileLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Dots />
      </div>
    );

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

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
