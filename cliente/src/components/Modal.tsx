import React, { memo, useMemo } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
export const Modal = memo(
  ({ isOpen, onClose, title, children }: ModalProps) => {
    
    const initial = useMemo(() => ({ opacity: 0 }), []);
    const animate = useMemo(() => ({ opacity: 1 }), []);
    const transition = useMemo(() => ({ duration: 0.2 }), []);
    const exit = useMemo(() => ({ opacity: 0 }), []);
    const memoizedChildren = useMemo(() => children, [children]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 h-screen flex items-center justify-center">
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition}
          exit={exit}
          className="w-full flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-none"
            onClick={onClose}
          />
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">{memoizedChildren}</div>
          </div>
        </motion.div>
      </div>
    );
  },
);

