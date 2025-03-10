import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({ signWithGoogle, isLoading }) => {
  return (
    <>
      <button
        onClick={signWithGoogle}
        type="button"
        className="w-full py-2 px-4 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700 
                flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors duration-75
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
    </>
  );
};
export default GoogleButton;

// puntos a considerar 
// Manejo de errores robusto para diferentes casos de error de autenticación.
// Estado de carga para mostrar feedback visual al usuario.
// Actualización del estado de autenticación en el contexto.
// Persistencia de datos del usuario si es necesario.
// Manejo de tokens y sesiones.
// Cierre apropiado del modal después de una autenticación exitosa.
// Mensajes de feedback claros para el usuario.
// Recuerda también manejar la desconexión y limpieza de recursos cuando sea necesario, y //asegurarte de que la configuración de Firebase esté correctamente establecida en tu proyecto