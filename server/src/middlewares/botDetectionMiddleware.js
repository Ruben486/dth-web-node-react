
export const botDetection = () => {
  return (req, res, next) => {
    if (req.useragent.isBot && req.useragent.isCurl === false) {
      return res.status(403).json({ message: "No están permitidos Bots" });
    }
    next();
  };
};
