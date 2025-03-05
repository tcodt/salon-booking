import React, { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

interface PrivateRoutesProps {
  children: ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoutes;
