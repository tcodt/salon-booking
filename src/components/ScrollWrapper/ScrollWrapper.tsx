// import React, { ReactNode, useEffect } from "react";
// import { useScroll } from "../../context/ScrollContext";

// type ScrollWrapperProps = {
//   children: ReactNode;
// };

// const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ children }) => {
//   const { setIsScrolling } = useScroll();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolling(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [setIsScrolling]);

//   return <div>{children}</div>;
// };

// export default ScrollWrapper;
