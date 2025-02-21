import { useState } from "react";
import { UserPlus, LogIn } from "lucide-react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";


export function AuthButtons() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsLoginOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 text-sm"
        >
          <LogIn size={20} />
          <span>Iniciar Sesión</span>
        </button>
        <button
          onClick={() => setIsRegisterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
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
