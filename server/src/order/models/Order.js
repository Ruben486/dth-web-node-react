import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    paymentId: { type: String, required: true },
    status: { type: String, required: true },
    status_detail: { type: String, required:false },
    transaction_amount: { type: Number, required: true },
    date_created: { type: Date, default: Date.now() },
    date_aproved: { type: Date, default: Date.now() },
    payment_method: {
      id: { type: String },
      type: { type: String },
    },
   order: {
      id: {type: String, required: false},
      type: {type: String, required: false}
    },
    payer: {
      email: { type: String },
      identification:{
        number: { type: String, required: false },
        type: { type: String, required: false }
      } ,
    },
    external_reference: { type: String },
    description: { type: String },
    metadata: { type: Object, required: false},
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
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
