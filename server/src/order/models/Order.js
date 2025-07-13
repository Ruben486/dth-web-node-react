import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    idCliente: {
      type: String,
      required: [true, "El id del cliente es requerido"],
    },
    productos: {
      type: [
        {
          id: {
            type: String,
            required: false,
          },
          descripcion: {
            type: String,
            required: false,
          },
          precio: {
            type: Number,
            required: false,
          },
          cantidad: {
            type: Number,
            required: false,
          },
        },
      ],
      required: false,
    },
    fechaOrden: {
      type: Date,
      default: Date.now,
    },
    total: {
      type: Number,
      required: [true, "El total de la orden es requerido"],
    },
    estado: {
      type: String,
    
      default: "Pendiente",
    },
    estadoPago: {
      type: String,
      
      default: "Pendiente",
      required: false,
    },
    formaDePago: {
      type: String,
     
      default: "Efectivo",
      required: false,
    },
    idTransaccion: { type: String, required: false },
    idTransaccionMercadoPago: { type: String, required: false },
    externalIdOrden: { type: String, required: false },

    payerName: { type: String, required: false },
    payerEmail: { type: String, required: false },
    payerId: { type: String, required: false },
    payerPhone: { type: String, required: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
