import mongoose from "mongoose";
import User from "./User.js";
import Producto from "./Producto.js";

const Schema = mongoose.Schema;

const FavoritoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productoId: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    }
});

export default mongoose.model('Favorito', FavoritoSchema);