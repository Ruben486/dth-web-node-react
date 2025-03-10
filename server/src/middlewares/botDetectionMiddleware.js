

export const botDetection = () => {
  return (req, res, next) => {
    if (req.useragent.isBot) {
      return res.status(403).json({ message: "No son permitidos Bots" });
    }
    next();
  };
};
