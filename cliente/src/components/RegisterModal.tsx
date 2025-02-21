import React from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { Modal } from './Modal';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Cuenta">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tu nombre"
            required
            className="w-full h-10 pl-10 pr-4 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <div className="relative">
          <input
            type="email"
            placeholder="tu@email.com"
            required
            className="w-full h-10 pl-10 pr-4 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
          Registrarse
        </button>
      </form>
    </Modal>
  );
}