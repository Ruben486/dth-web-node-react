import Categoria from "../modelos/Categoria.js";

// Obtener todas las categorías
export const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorías', error });
    }
};

export const getCategoriasFrecuentes = async (req, res) => {
    try {
        const categorias = await Categoria.find({frecuente: true});
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorías', error });
    }
};
// Obtener una categoría por ID
export const getCategoriaById = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la categoría', error });
    }
};

// Crear una nueva categoría
export const createCategoria = async (req, res) => {
    try {
        const nuevaCategoria = new Categoria(req.body);
        const categoriaGuardada = await nuevaCategoria.save();
        res.status(201).json(categoriaGuardada);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la categoría', error });
    }
};

// Actualizar una categoría existente
export const updateCategoria = async (req, res) => {
    try {
        const categoriaActualizada = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!categoriaActualizada) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(categoriaActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la categoría', error });
    }
};

// Eliminar una categoría
export const deleteCategoria = async (req, res) => {
    try {
        const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);
        if (!categoriaEliminada) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la categoría', error });
    }
};
const categoriaController= {
    getCategorias,
    getCategoriasFrecuentes,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
}
export default categoriaController;