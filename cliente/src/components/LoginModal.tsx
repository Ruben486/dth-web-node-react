import React from "react";
import { Mail, Lock } from "lucide-react";
import { Modal } from "./Modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Iniciar Sesión">
      <form onSubmit={handleSubmit} className="space-y-4 shadow-md">
        <div className="relative">
          <input
            type="email"
            placeholder="tu@email.com"
            required
            className="w-full h-10 pl-10 pr-4 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 peer"
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="••••••••"
            required
            className="w-full h-10 pl-10 pr-4 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>
    </Modal>
  );
}
