import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductoSchema = new Schema(
  {
    descripcion: {
      type: String,
      required: [true, "La desdcripcion del producto es requerida"],
      trim: true,
    },

    idGestion: {
      categoria:{ type: String, required: false, default: null },
      subRubro: { type: String, required: false, default: null },
      producto: { type: String, required: false, default: null },
    },
    categoriaId: {
      type: Schema.Types.ObjectId, 
      ref: "Categoria",
      required: [true, "El id de la categoria es requerido"],
      default: null,
    }, 
    categoria: {
      type: String,
      required: false,
      trim: true,
    },
    
    precio: {
      type: Number,
      required: [true, "El valor del producto es requerido"],
      min: 0,
    },
    
    porcDtoEfec: { type: Number, required: false, default: 0 },
    oferta: { type: Boolean, required: true, default: false },
    precioOferta: { type: Number, required: false, default: 0 },
    financiadoEntrega: { type: Number, required: false, default: 0 },
    financiadoCuotas: { type: Number, required: false, default: 0 },
    financiadoImpCuota: { type: Number, required: false, default: 0 },
    stock: { type: Number, required: true, default: 1 },
    urlImagen: { type: String, required: false },
    destacado: { type: Boolean, required: true, default: false },
    nuevo: { type: Boolean, required: true, default: false },
    masVendido: { type: Boolean, required: true, default: false },
    marca: { type: String, required: false, default: null },
    caracDestacados: [String],
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
  },
  { timestamps: true }
);

const Producto = mongoose.model("Producto", ProductoSchema);

export default Producto;
