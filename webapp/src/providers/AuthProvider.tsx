import { createContext, useState, ReactNode, useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import parseJwt from "../scripts/decodeJWT";

// Définir les mutations GraphQL pour la connexion et la déconnexion
const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

// Définir le contexte d'authentification
interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const login = async (username: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: { username, password },
      });
      setToken(data.login.token);
      setUser(parseJwt(data.login.token).username);
      localStorage.setItem("token", data.login.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      // Implement registration logic here
      console.log("Registering user:", email, password);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const storedToken = localStorage.getItem("token");
  if (storedToken && !token) {
    setToken(storedToken);
  }

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
