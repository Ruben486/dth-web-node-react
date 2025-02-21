const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductoSchema = new Schema(
  {
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    categoriaId: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    categoryLabel:{ type: String, required: true},
    subCategory: { type: String, required: true}, 
    detalle: { type: String, required: true },
    porcDtoEfectivo: {type: Number, required:false, default: 0},
    itemsDestacados: [String],
    tabsData: [
      {
        label: { type: String, required: true },
        content: [
          {
            nombre: { type: String, required: true },
            valor: { type: String, required: true },
          },
        ],
      },
    ],
    precio: { type: Number, required: true },
    precioOferta: { type: Number, required: false, default: 0 },
    stock: { type: Number, required: true, default: 1 },
    urlImagen: { type: String, required: false },
    destacado: { type: Boolean, required: true, default: false },
    oferta: { type: Boolean, required: true, default: false },
    nuevo: { type: Boolean, required: true, default: false },
    masVendido: { type: Boolean, required: true, default: false },
    marca: {type: String, required: false, default: null}
  },
  { timestamps: true }
);

const Producto = mongoose.model("Producto", ProductoSchema);

module.exports = Producto;
