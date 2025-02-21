const { serverCache } = require('../../app');
const Producto = require('../modelos/Producto');

const getAllProductos = async (req, res) => {
    try {
        if (serverCache.productos) {
            return res.json(serverCache.productos);
        }

        const productos = await Producto.find();
        serverCache.productos = productos;
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};
const getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

const addProducto = async (req, res) => {
    try {
        const newProducto = new Producto(req.body);
        const savedProducto = await newProducto.save();
        serverCache.productos = null; // Clear cache
        res.status(201).json(savedProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto', error });
    }
};

const deleteProducto = async (req, res) => {
    try {
        const deletedProducto = await Producto.findByIdAndDelete(req.params.id);
        if (!deletedProducto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        serverCache.productos = null; // Clear cache
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

const updateProducto = async (req, res) => {
    try {
        const updatedProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProducto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        serverCache.productos = null; // Clear cache
        res.json(updatedProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

module.exports = {
    getAllProductos,
    getProductoById,
    addProducto,
    deleteProducto,
    updateProducto
};
