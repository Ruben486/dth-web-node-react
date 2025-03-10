import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductoSchema = new Schema(
  {
    descripcion: {
      type: String,
      required: [true, "La desdcripcion del producto es requerida"],
      trim: true,
    },
    codigo: { type: String, required: true },
    categoriaId: {
      type: String,
      required: [true, "El Id de la Categoria es requerido"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    subCategory: { type: String, required: true },
    detalle: {
      type: String,
      required: [true, "El detalle del produto es requerido"],
    },
    porcDtoEfectivo: { type: Number, required: false, default: 0 },
    itemsDestacados: [String],
    tabsData: [
      {
        label: { type: String, required: false },
        content: [
          {
            nombre: { type: String, required: false },
            valor: { type: String, required: false },
          },
        ],
      },
    ],
    precio: {
      type: Number,
      required: [true, "El valor del producto es requerido"],
      min: 0,
    },
    precioOferta: { type: Number, required: false, default: 0 },
    stock: { type: Number, required: true, default: 1 },
    urlImagen: { type: String, required: false },
    destacado: { type: Boolean, required: true, default: false },
    oferta: { type: Boolean, required: true, default: false },
    nuevo: { type: Boolean, required: true, default: false },
    masVendido: { type: Boolean, required: true, default: false },
    marca: { type: String, required: false, default: null },
  },
  { timestamps: true }
);

const Producto = mongoose.model("Producto", ProductoSchema);

export default Producto;
