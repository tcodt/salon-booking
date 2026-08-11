import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { BusinessMeResponse } from "../types/business";

const STORAGE_KEY = "joinedBusiness";

export type JoinedBusiness = BusinessMeResponse;

interface JoinedBusinessContextType {
  joinedBusiness: JoinedBusiness | null;
  isReady: boolean;
  setJoinedBusiness: (business: JoinedBusiness) => void;
  clearJoinedBusiness: () => void;
  hasJoinedBusiness: boolean;
}

const JoinedBusinessContext = createContext<
  JoinedBusinessContextType | undefined
>(undefined);

function readFromStorage(): JoinedBusiness | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as JoinedBusiness;
    if (!parsed?.id || !parsed?.random_code) return null;
    return parsed;
  } catch {
    return null;
  }
}

export const JoinedBusinessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [joinedBusiness, setJoinedBusinessState] =
    useState<JoinedBusiness | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setJoinedBusinessState(readFromStorage());
    setIsReady(true);
  }, []);

  const setJoinedBusiness = useCallback((business: JoinedBusiness) => {
    setJoinedBusinessState(business);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(business));
  }, []);

  const clearJoinedBusiness = useCallback(() => {
    setJoinedBusinessState(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      joinedBusiness,
      isReady,
      setJoinedBusiness,
      clearJoinedBusiness,
      hasJoinedBusiness: !!joinedBusiness,
    }),
    [joinedBusiness, isReady, setJoinedBusiness, clearJoinedBusiness],
  );

  return (
    <JoinedBusinessContext.Provider value={value}>
      {children}
    </JoinedBusinessContext.Provider>
  );
};

export const useJoinedBusiness = (): JoinedBusinessContextType => {
  const ctx = useContext(JoinedBusinessContext);
  if (!ctx) {
    throw new Error(
      "useJoinedBusiness must be used within JoinedBusinessProvider",
    );
  }
  return ctx;
};
