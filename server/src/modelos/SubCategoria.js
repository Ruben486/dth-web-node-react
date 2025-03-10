import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SubCategoriaSchema = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    idSV: {
        type: String,
        required: false,
        default: null,
    },
    categoriaID: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
});

export default mongoose.model('SubCategoria', SubCategoriaSchema);