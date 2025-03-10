// funcion para enviar la respuesta
export const sendResponse = (
  res,
  statusCode,
  success,
  message,
  user = null,
  token = null
) => {
  const response = {
    success,
    message,
    user,
    token,
  };
  return res.status(statusCode).json(response);
};