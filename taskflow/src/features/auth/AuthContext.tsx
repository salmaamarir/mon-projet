import { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode, Dispatch } from "react";
import type { AuthState, AuthAction } from "./authReducer";

import { authReducer, initialState } from "./authReducer";
import { setAuthToken } from '../../api/axios';

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Le Provider qui gère la logique globale
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Appelé à chaque fois que le token change
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook personnalisé pour utiliser l'authentification
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}