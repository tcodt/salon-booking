// components/BusinessStatusGuard/BusinessStatusGuard.tsx
import React from "react";
import { Navigate, useLocation } from "react-router";
import { useBusinessMe } from "../../hooks/business/useBusinessMe";
import { useAuth } from "../../context/AuthContext";

interface BusinessStatusGuardProps {
  children: React.ReactNode;
}

export const BusinessStatusGuard: React.FC<BusinessStatusGuardProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const { data: businessData, isLoading, error } = useBusinessMe();
  const location = useLocation();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Show loading state while checking business status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">درحال بررسی کسب و کار...</p>
        </div>
      </div>
    );
  }

  // If there's an error or no business data
  if (error || !businessData) {
    // Redirect to role authentication to create business
    return <Navigate to="/role-authentication" replace />;
  }

  // If business is NOT active and user is NOT on waiting room
  if (!businessData.is_active && location.pathname !== "/waiting-room") {
    return <Navigate to="/waiting-room" replace />;
  }

  // If business IS active and user is on waiting room
  if (businessData.is_active && location.pathname === "/waiting-room") {
    return <Navigate to="/dashboard" replace />;
  }

  // If business IS active, allow access to all routes
  // If business is NOT active, only allow access to waiting room
  if (!businessData.is_active && location.pathname === "/waiting-room") {
    return <>{children}</>;
  }

  // Allow access to children (authenticated routes)
  return <>{children}</>;
};
