// manejo de envio de errores
export const handleError = (res, statusCode, message, error) => {
  const response = {
    success: false,
    message: error.message || message,
    error,
  };
  return res.status(statusCode || 500).json(response);
};
