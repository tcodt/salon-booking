import { createContext, useContext, useEffect, useState } from "react";

interface WalletContextType {
  balance: number;
  recharge: (amount: number) => void;
  spend: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [balance, setBalance] = useState<number>(() => {
    const stored = localStorage.getItem("demoWalletBalance");
    return stored ? Number(stored) : 0;
  });

  useEffect(() => {
    localStorage.setItem("demoWalletBalance", String(balance));
  }, [balance]);

  const recharge = (amount: number) => setBalance((b) => b + amount);
  const spend = (amount: number) => setBalance((b) => b - amount);

  return (
    <WalletContext.Provider value={{ balance, recharge, spend }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
