import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useUserType } from "../../context/UserTypeContext";
import { useBusinessMe } from "../../hooks/business/useBusinessMe";
import { useJoinedBusiness } from "../../context/JoinedBusinessContext";

export const BusinessStatusGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const { userType, isReady } = useUserType();
  const { hasJoinedBusiness, isReady: joinReady } = useJoinedBusiness();
  const location = useLocation();
  const isOwnerFlow = userType === "owner";

  const {
    data: businessData,
    isLoading,
    isError,
    isFetched,
    error,
  } = useBusinessMe();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isReady || !joinReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-green-500 border-t-transparent" />
      </div>
    );
  }

  // ---------- CUSTOMER (and unknown role) ----------
  // Never use /business/me/ for customers. 404 is normal.
  if (!isOwnerFlow) {
    const openWithoutSalon = ["/join-salon", "/logout", "/user-profile"];

    if (
      userType === "customer" &&
      !hasJoinedBusiness &&
      !openWithoutSalon.includes(location.pathname)
    ) {
      return <Navigate to="/join-salon" replace />;
    }

    return <>{children}</>;
  }

  // ---------- OWNER ONLY ----------
  if (isLoading || !isFetched) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-green-500 border-t-transparent" />
          <p className="text-gray-600">درحال بررسی کسب و کار...</p>
        </div>
      </div>
    );
  }

  const errorStatus = (
    error as unknown as { response?: { status?: number } } | null
  )?.response?.status;

  const noBusiness = isError || !businessData || errorStatus === 404;

  if (noBusiness) {
    if (
      location.pathname === "/create-business" ||
      location.pathname === "/role-authentication"
    ) {
      return <>{children}</>;
    }
    return <Navigate to="/create-business" replace />;
  }

  if (!businessData.is_active && location.pathname !== "/waiting-room") {
    return <Navigate to="/waiting-room" replace />;
  }

  return <>{children}</>;
};
