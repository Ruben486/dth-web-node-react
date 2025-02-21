const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, 
       required: [true,'Ingrese un nombre de usuario'],
       unique: [true,'Ya existe el usuario ingresado'],
    },
    email: {type: String,
       required: [true,'Ingrese un correo electronico valido'],
       unique: [true, 'El email ingresado ya existe']},
    password: { type: String,
       required: [true,'Debe ingresar una contraseña'],
       unique: false},   
    isAdmin: {type: Boolean,default: false,},
   },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
