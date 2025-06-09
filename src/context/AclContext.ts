// import { createContext, ReactNode } from "react";
// import { useGetAclById } from "../hooks/acl/useGetAclById";

// interface AclContextType {
//     permissions: string[]
// }

// const AclContext = createContext<AclContextType>({permissions: []})

// export const AclProvider = ({children, userId}: {children: ReactNode, userId: number}) => {
// const {data} = useGetAclById(userId)

// const permissions = data?.permissions?.map((perm) => perm.code) || [];
// }
