import { useState } from "react";
import { UserPlus, LogIn, LogOut } from "lucide-react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import { useAuth } from "../contexts/authContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AuthButtons() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  if (user) {
    return (
      <>
        <div className="flex items-center gap-2">
          <span> {user.username} </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center gap-2 p-2 bg-gray-200 text-gray-800 hover:bg-gray-500 hover:text-white text-sm rounded-lg transition-colors duration-75 ">
                  <LogOut size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cerrar sesión</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700
          hover:text-gray-900 text-sm"
          >
            <LogIn size={20} />
            <span>Iniciar Sesión</span>
          </button>
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-pink-400
          text-white rounded-lg hover:bg-pink-500 transition-colors text-sm"
          >
            <UserPlus size={20} />
            <span>Registrarse</span>
          </button>
        </div>
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />

        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
        />
      </>
    );
  }
}
