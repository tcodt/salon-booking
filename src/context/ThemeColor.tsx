import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface ThemeColorContextType {
  themeColor: string;
  setThemeColor: (color: string) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(
  undefined
);

export const ThemeColorProvider = ({ children }: { children: ReactNode }) => {
  const [themeColor, setThemeColor] = useState<string>(() => {
    return localStorage.getItem("themeColor") || "primary-green";
  });

  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);

    // Set CSS custom property
    document.documentElement.style.setProperty("--theme-color", themeColor);
  }, [themeColor]);

  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
};

export const useThemeColor = () => {
  const context = useContext(ThemeColorContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
