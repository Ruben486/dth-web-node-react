import React, { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from 'react-icons/fc'; // Importa el ícono de Google
import { Modal } from "./Modal";
import { useAuth } from "../contexts/authContext";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface LoginFormData {
  email: string;
  password: string;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { signIn, signInWithGoogle, errors: loginErrors, isLoading, isAuthenticated } = useAuth();

  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    await signIn(data);
  };
  
  const togglePasswordVisibity = () => {
    setShowPassword(!showPassword);
  };

  // Close the modal if user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      onClose();
      // Mostrar mensaje de éxito cuando el usuario se autentica
      toast({
        title: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente.",
        variant: "default",
      });
    }
  }, [isAuthenticated, onClose, toast]);

  // Mostrar errores de login en el toaster
  useEffect(() => {
    if (loginErrors.length > 0) {
      toast({
        title: "Error de inicio de sesión",
        description: loginErrors,
        variant: "destructive",
      });
    }
  }, [loginErrors, toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Iniciar Sesión">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 shadow-md">
        {/* Botón de Google */}
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="w-full py-2 px-4 mb-4 bg-white border border-gray-300 rounded-lg 
        text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 
        transition-colors duration-75 focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-gray-500"
        disabled={isLoading}
      >
        <FcGoogle className="w-5 h-5" />
        Continuar con Google
      </button>

      {/* Separador */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">O</span>
        </div>
      </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            autoFocus
            required
            disabled={isLoading}
            className="w-full h-10 pl-10 pr-4 text-sm bg-white/50 border
             border-gray-300 rounded-lg focus:outline-none
              focus:border-gray-100 focus:ring-1 focus:ring-gray-50 peer"
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Dirección de email inválida",
              },
            })}
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            required
            disabled={isLoading}
            className="w-full h-10 pl-10 pr-4 text-sm
             bg-white/50 border border-gray-300 rounded-lg
              focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-gray-50"
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <button
            type="button"
            onClick={togglePasswordVisibity}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            tabIndex={-1} // para eviar que el boton reciba focus al tabular
          >
            {showPassword ? (
              <EyeOff className="w-4 h.4" />
            ) : (
              <Eye className="w-4 h-4" />
            )};
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 ${
            isLoading ? "bg-gray-400" : "bg-gray-700 hover:bg-pink-700"
          } text-white rounded-lg focus:outline-none focus:border-gray-200
            focus:ring-1 focus:ring-gray-50 transition-colors duration-75 flex justify-center items-center`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
                   7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Procesando...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </button>
      </form>
    </Modal>
  );
}


// añadir componente de login para el boton de google
const GoogleButton = ({ onClick, isLoading }: { onClick: () => void, isLoading: boolean }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      className="w-full py-2 px-4 mb-4 bg-white border border-gray-300 rounded-lg 
      text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 
      transition-colors duration-75 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          Conectando...
        </div>
      ) : (
        <>
          <FcGoogle className="w-5 h-5" />
          Continuar con Google
        </>
      )}
    </button>
  );
};
// puntos a considerar 
// Manejo de errores robusto para diferentes casos de error de autenticación.
// Estado de carga para mostrar feedback visual al usuario.
// Actualización del estado de autenticación en el contexto.
// Persistencia de datos del usuario si es necesario.
// Manejo de tokens y sesiones.
// Cierre apropiado del modal después de una autenticación exitosa.
// Mensajes de feedback claros para el usuario.
// Recuerda también manejar la desconexión y limpieza de recursos cuando sea necesario, y //asegurarte de que la configuración de Firebase esté correctamente establecida en tu proyecto