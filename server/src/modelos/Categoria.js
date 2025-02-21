const mongoose = require("mongoose");

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
    default: "000",
    index: true,
  },
  frecuente: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model("Categoria", CategoriaSchema);
