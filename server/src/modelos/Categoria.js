import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CategoriaSchema = new Schema({
  descripcion: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    index: true, // esto hace que el campo no admita dupliaciones
    
  },
  frecuente: { type: Boolean, required: true, default: false }
});

export default  mongoose.model("Categoria", CategoriaSchema);
