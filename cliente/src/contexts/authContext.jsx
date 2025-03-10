import { useState, useEffect, createContext, useContext } from "react";
import {
  login,
  register,
  verifyTokenRequest,
  logoutRequest,
  updateGoogleUserData,
} from "../api/authApi";

import Cookies from "js-cookie";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } catch (error) {
        console.log("Error de verificacion");
        setUser(null);
        Cookies.remove("token");
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  const signIn = async (email, password) => {
    try {
      setIsLoading(true);
      const res = await login(email, password);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return res;
    } catch (error) {
      handleAuthError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // signUp
  const signUp = async (userData) => {
    try {
      setIsLoading(true);
      const res = await register(userData);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return res;
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // logout
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

  const handleAuthError = (error) => {
    const errorMessage =
      error.response?.data.message || error.message || "error de autenticación";
    setErrors([errorMessage]);
  };
  const checkTokenValidity = async () => {
    if (!isAuthenticated) return false;

    try {
      await verifyTokenRequest();
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };
  // manejo del login con google
  const signWithGoogle = async () => {
    try {
      setIsLoading(true);
      setErrors([]);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const user = result.user;
        // Si necesitas guardar información adicional en tu base de datos
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
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      let errorMessage = "Error al iniciar sesión con Google";

      // Manejo específico de errores
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

  const value = {
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
