// --- File: contexts/UserTypeContext.tsx ---
import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserType = "customer" | "owner" | null;

interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: "customer" | "owner") => void;
  clearUserType: () => void;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(
  undefined,
);

export const UserTypeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userType, setUserType] = useState<UserType>(null);

  const handleSetUserType = (type: "customer" | "owner") => {
    setUserType(type);
    // In a real app, you might also persist to localStorage or sessionStorage here
    // localStorage.setItem('userType', type);
  };

  const clearUserType = () => {
    setUserType(null);
    // localStorage.removeItem('userType');
  };

  return (
    <UserTypeContext.Provider
      value={{
        userType,
        setUserType: handleSetUserType,
        clearUserType,
      }}
    >
      {children}
    </UserTypeContext.Provider>
  );
};

// Custom hook for using the context
export const useUserType = (): UserTypeContextType => {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error("useUserType must be used within a UserTypeProvider");
  }
  return context;
};
