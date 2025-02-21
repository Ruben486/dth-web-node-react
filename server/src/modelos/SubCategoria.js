const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubCategoriaSchema = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    codigoSistemaVentas: {
        type: String,
        required: false,
        default: null,
    },
    categoriaID: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    imagen: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('SubCategoria', SubCategoriaSchema);