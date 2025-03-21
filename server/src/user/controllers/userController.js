import User from "../models/User.js";
import bcrypt from "bcrypt";

// UPDATE
const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  try {
    const upddUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },

      { new: true }
    );
    res.status(200).json(upddUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("El usuario ha sido eliminado ...");

  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);

  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
    
  } catch (err) {
    res.status(500).json(err);
  }
};
export  { updateUser,deleteUser,getUser,getAllUsers };
