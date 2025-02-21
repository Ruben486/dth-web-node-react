const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Producto = require('./Producto');

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

module.exports = mongoose.model('Favorito', FavoritoSchema);