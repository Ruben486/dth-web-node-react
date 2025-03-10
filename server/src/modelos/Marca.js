import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MarcasSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripcion de la marca es requerido'],
    },
});

export default mongoose.model('Marca', MarcasSchema);