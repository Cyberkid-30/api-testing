import { createContext } from "react";

interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
