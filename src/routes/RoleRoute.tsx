import React from "react";
import { Navigate } from "react-router";
import { useAclOptional } from "../context/AclContext";
import { useUserType } from "../context/UserTypeContext";
import { useAuth } from "../context/AuthContext";
import Dots from "../components/Dots/Dots";

type RoleRouteProps = {
  children: React.ReactNode;
  allow: "owner" | "customer" | "any";
};

/**
 * Works both inside AclProvider (app shell) and outside it (UserFlow / random-code).
 * Outside ACL → falls back to userType + auth only.
 */
export const RoleRoute: React.FC<RoleRouteProps> = ({ children, allow }) => {
  const acl = useAclOptional();
  const { userType, isReady: userTypeReady } = useUserType();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  if (authLoading || !userTypeReady || acl?.isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Dots />
      </div>
    );
  }

  // Prefer ACL when available; otherwise userType from onboarding
  const isOwner =
    !!acl?.isBusinessOwner ||
    !!acl?.isOwner ||
    acl?.role === "admin" ||
    userType === "owner";

  if (allow === "any") {
    return <>{children}</>;
  }

  // Onboarding routes may be visited before/without full auth
  if (allow === "customer") {
    // Owners should not use join-by-code / reserve flows
    if (isAuthenticated && isOwner) {
      return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
  }

  if (allow === "owner") {
    if (!isAuthenticated) {
      return <Navigate to="/auth" replace />;
    }
    if (!isOwner) {
      return <Navigate to="/home" replace />;
    }
    return <>{children}</>;
  }

  return <>{children}</>;
};
