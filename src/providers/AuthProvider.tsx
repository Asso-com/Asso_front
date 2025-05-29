import React, {
  createContext,
  //   useState,
  //   useEffect,
  //   useLayoutEffect,
} from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
