// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from "react";
// import { User } from "../types/types";

// interface UserContextType {
//   user: User | null;
//   isStaff: boolean;
//   isOwner: boolean;
// }

// const UserContext = createContext<User | undefined>(undefined);

// export const UserProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const isStaff = user?.is_staff || false;
//   const isOwner = user?.is_owner || false;

//   return (
//     <UserContext.Provider value={{ user, isStaff, isOwner }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
