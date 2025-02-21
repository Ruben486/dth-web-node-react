const User = require("../modelos/User");

// Middleware to check for user ID
async function checkUserId(req, res, next) {
  if (!req.body.userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const userFound = await User.findById(req.body.userId);
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
module.exports = checkUserId;
