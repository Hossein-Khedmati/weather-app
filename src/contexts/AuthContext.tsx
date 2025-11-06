import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem("userName")
  );

  const login = (name: string) => {
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  const logout = () => {
    setUserName(null);
    localStorage.removeItem("userName");
  };

  const isAuthenticated = !!userName;

  return (
    <AuthContext.Provider value={{ userName, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
