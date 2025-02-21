const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MarcasSchema = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    
    imagen: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Marca', MarcasSchema);