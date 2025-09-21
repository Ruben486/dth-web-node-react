import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import {
  login,
  register,
  verifyTokenRequest,
  logoutRequest,
  updateGoogleUserData
} from "../components/user/api/authApi";
import Cookies from "js-cookie";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";
import { User } from '../types/types';

type SignInProps = {
  email: string;
  password: string;
};

interface AuthContextType {
  user: User | null; // Permitir null
  signIn: (value: SignInProps) => Promise<any>;
  signWithGoogle: () => Promise<void>;
  signUp: (value: User) => Promise<any>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  errors: string[];
  isLoading: boolean;
  checkTokenValidity: () => Promise<boolean>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await verifyTokenRequest();
        if (res.data.user) {
          setUser(res.data.user);
          setIsAuthenticated(true);
        }
      } catch (error: any) {
        console.log(error.response?.data?.message);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  const signIn = async ({ email, password }: SignInProps) => {
    try {
      setIsLoading(true);
      const res = await login(email, password);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return res;
    } catch (error: any) {
      handleAuthError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: User) => {
    try {
      setIsLoading(true);
      const res = await register(userData);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return res;
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const res = await logoutRequest();
    } catch (error) {
      console.log("error durante el Cierre de Sesión");
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      Cookies.remove("token");
      setIsLoading(false);
    }
  };

  const handleAuthError = (error: any) => {
    const errorMessage =
      error.response?.data.message || error.message || "error de autenticación";
    setErrors([errorMessage]);
  };

  const checkTokenValidity = async (): Promise<boolean> => {
    if (!isAuthenticated) return false;
    try {
      await verifyTokenRequest();
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  const signWithGoogle = async () => {
    try {
      setIsLoading(true);
      setErrors([]);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const user = result.user;
        const res = await updateGoogleUserData({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
        setUser(res.data.user);
        setIsAuthenticated(true);
      } else {
        setErrors(["No se pudo iniciar sesión con Google"]);
      }
    } catch (error: any) {
      console.error("Error al iniciar sesión con Google:", error);
      let errorMessage = "Error al iniciar sesión con Google";
      
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Se cerró la ventana de inicio de sesión";
      } else if (error.code === "auth/cancelled-popup-request") {
        errorMessage = "Se canceló la solicitud de inicio de sesión";
      }
      setErrors([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    signIn,
    signWithGoogle,
    signUp,
    logout,
    isAuthenticated,
    errors,
    isLoading,
    checkTokenValidity,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;