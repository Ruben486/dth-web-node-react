import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
   {
      username: { 
         type: String, 
         trim : true,
         required: [true, 'Ingrese un nombre de usuario'],
         unique: false,
      },
      email: {
         type: String,
         trim: true,
         lowercase: true,
         required: [true, 'Ingrese un correo electronico valido'],
         unique: [true, 'El email ingresado ya existe'],
         match: [/^\S+@\S+\.\S+$/, 'Ingrese un correo electronico valido']
      },
      password: { 
         type: String,
         required: [true, 'Debe ingresar una contraseña'],
         unique: false
      },   
      isAdmin: {
         type: Boolean,
         default: false,
      },
      authProvider: {
         type: String,
         enum: ["email", "google"],
         required: true,
         default: "email",
      },   
      googleId: {
         type: String,
         default: null,
      },
      isAdmin: {
         type: Boolean,
         default: false,
      },
   },

   { timestamps: true }
);
// indice para acelerar la busqueda //
UserSchema.index({ googleId: 1 }, { unique: true });
export default mongoose.model("User", UserSchema);
