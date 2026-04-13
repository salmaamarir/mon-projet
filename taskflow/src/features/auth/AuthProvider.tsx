import { useReducer } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer, initialState } from "./authReducer";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}