// import React, { createContext, useContext, useState } from "react";

// interface ScrollContextType {
//   isScrolling: boolean;
//   setIsScrolling: (isScrolling: boolean) => void;
// }

// const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isScrolling, setIsScrolling] = useState(false);

//   return (
//     <ScrollContext.Provider value={{ isScrolling, setIsScrolling }}>
//       {children}
//     </ScrollContext.Provider>
//   );
// };

// export const useScroll = () => {
//   const context = useContext(ScrollContext);
//   if (!context) {
//     throw new Error("useScroll must be used within a ScrollProvider");
//   }
//   return context;
// };
