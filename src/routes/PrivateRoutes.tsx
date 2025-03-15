import React, { ReactNode } from "react";
import { Navigate } from "react-router";

interface PrivateRoutesProps {
  children: ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  return token ? children : <Navigate to="/auth" />;
};

export default PrivateRoutes;
