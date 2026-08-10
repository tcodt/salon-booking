import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type UserType = "customer" | "owner" | null;

interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: "customer" | "owner") => void;
  clearUserType: () => void;
  isReady: boolean;
}

const STORAGE_KEY = "userType";

const UserTypeContext = createContext<UserTypeContextType | undefined>(
  undefined,
);

export const UserTypeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userType, setUserTypeState] = useState<UserType>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as UserType | null;
    if (saved === "customer" || saved === "owner") {
      setUserTypeState(saved);
    }
    setIsReady(true);
  }, []);

  const setUserType = (type: "customer" | "owner") => {
    setUserTypeState(type);
    localStorage.setItem(STORAGE_KEY, type);
  };

  const clearUserType = () => {
    setUserTypeState(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <UserTypeContext.Provider
      value={{ userType, setUserType, clearUserType, isReady }}
    >
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = (): UserTypeContextType => {
  const context = useContext(UserTypeContext);
  if (!context) {
    throw new Error("useUserType must be used within a UserTypeProvider");
  }
  return context;
};
