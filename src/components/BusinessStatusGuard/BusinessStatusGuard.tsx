import React from "react";
import { Navigate, useLocation } from "react-router";
import { useBusinessMe } from "../../hooks/business/useBusinessMe";
import { useAuth } from "../../context/AuthContext";
import { useUserType } from "../../context/UserTypeContext";

interface BusinessStatusGuardProps {
  children: React.ReactNode;
}

export const BusinessStatusGuard: React.FC<BusinessStatusGuardProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const { userType, isReady } = useUserType();
  const location = useLocation();
  const isOwnerFlow = userType === "owner";

  // Customers (or unknown type) never need business-me checks
  const { data: businessData, isLoading, error, isFetched } = useBusinessMe();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Wait for persisted role
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Normal users skip owner business gate entirely
  if (!isOwnerFlow) {
    // Optional: force code join if they have no joined business yet
    const joined = localStorage.getItem("joinedBusiness");
    const onboardingPaths = [
      "/role-authentication",
      "/random-code-input",
      "/create-business",
    ];
    if (
      !joined &&
      !onboardingPaths.includes(location.pathname) &&
      userType === "customer"
    ) {
      return <Navigate to="/random-code-input" replace />;
    }
    return <>{children}</>;
  }

  // ---- Owner flow ----
  if (isLoading || !isFetched) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">درحال بررسی کسب و کار...</p>
        </div>
      </div>
    );
  }

  // No business yet → create flow
  if (error || !businessData) {
    if (
      location.pathname === "/create-business" ||
      location.pathname === "/role-authentication"
    ) {
      return <>{children}</>;
    }
    return <Navigate to="/create-business" replace />;
  }

  // Pending activation
  if (!businessData.is_active && location.pathname !== "/waiting-room") {
    return <Navigate to="/waiting-room" replace />;
  }

  // Already active but still on waiting room → dashboard
  if (businessData.is_active && location.pathname === "/waiting-room") {
    // Allow rendering waiting room so user can see congratulations once;
    // WaitingRoom itself has the CTA to dashboard.
    // If you prefer auto-redirect, use:
    // return <Navigate to="/dashboard" replace />;
    return <>{children}</>;
  }

  return <>{children}</>;
};
