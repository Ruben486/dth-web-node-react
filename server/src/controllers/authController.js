const User = require('../modelos/User');
const bcrypt = require('bcrypt');
const { generateToken } = require("../librerias/token");


const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const token = generateToken({ id: savedUser._id });

    res.cookie('token', token,
       { httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: "none" }
        );

    res.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      isadmin: savedUser.isadmin,
      email: savedUser.email,

    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("Usuario no encontrado");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json("Usuario o Contraseña incorrecta");

    const token = generateToken({ id: user._id });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "none"
    });
    console.log(token)

    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = { register, login};