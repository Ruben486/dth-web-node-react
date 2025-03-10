import React, { useEffect, useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Modal } from "./Modal";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../contexts/authContext";
import GoogleButton from "./GoogleButton";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const {
    signUp,
    signWithGoogle,
    errors: registerErrors,
    isLoading,
    isAuthenticated,
  } = useAuth();

  
  const { toast } = useToast();
  const onSubmit = async (data: RegisterFormData) => {
    await signUp(data);
  };

  const togglePasswordVisibity = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      onClose();
      // mensaje de registro exitoso
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente.",
        variant: "default",
      });
    }
  }, [isAuthenticated, onClose, toast]);

  // Mostrar errores de registro en el toaster
  useEffect(() => {
    if (registerErrors.length > 0) {
      toast({
        title: "Error de registro",
        description: registerErrors,
        variant: "destructive",
      });
    }
  }, [registerErrors, toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Cuenta">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <GoogleButton signWithGoogle={signWithGoogle} disabled={isLoading} />
        <div className="relative">
          <input
            type="text"
            placeholder="Tu nombre"
            autoFocus
            required
            disabled={isLoading}
            className="w-full h-10 pl-10 pr-4 text-sm
             bg-white/50 border border-gray-300 rounded-lg
              focus:outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300"
            {...register("username", {
              required: "El nombre es requerido",
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
            })}
          />
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        {errors.username && (
          <p className="text-xs text-red-500">{errors.username.message}</p>
        )}

        <div className="relative">
          <input
            type="email"
            placeholder="tu@email.com"
            required
            disabled={isLoading}
            className="w-full h-10 pl-10 pr-4 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300"
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
            placeholder="••••••••"
            required
            disabled={isLoading}
            className="w-full h-10 pl-10 pr-4 text-sm bg-white/50 border border-gray-300
             rounded-lg focus:outline-none focus:border-zinc-300
              focus:ring-1 focus:ring-zinc-300"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400
             hover:text-gray-600 focus:outline-none"
            tabIndex={-1} // para eviar que el boton reciba focus al tabular
          >
            {showPassword ? (
              <EyeOff className="w-4 h.4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            ;
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 ${
            isLoading ? "bg-gray-400" : "bg-gray-800 hover:bg-pink-700"
          }  text-white rounded-lg
           hover:bg-pink-700 transition-colors duration-75 flex justify-center items-center
            focus:border-zinc-300
            focus:ring-1 focus:ring-zinc-300`}
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
                   5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              procesando...
            </>
          ) : (
            "Registrarse"
          )}
        </button>
      </form>
    </Modal>
  );
}
