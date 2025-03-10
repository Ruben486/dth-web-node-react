import Favorito from '../modelos/Favorito.js';
import User from '../modelos/User.js';
import Producto from '../modelos/Producto.js';

// get all favoritos
export const getAllFavoritosUser =  async (req, res) => {
    try {
        const favoritos = await Favorito.find({ userId: req.body.userId });
        res.json(favoritos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ad favorto
export const addFavorito = async (req, res) => {
    const { userId, item } = req.body;
    const user = await User.findById(userId);
    const producto = await Producto.findById(item);   
    console.log(producto._id, user._id);
    try {
        const newFavorito = new Favorito({userId: user.id, productoId: producto._id} );
        await newFavorito.save();
        res.status(201).json(newFavorito);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// update favorito
export const updateFavorito = async (req, res) => {
    const { id } = req.params;
    const { userId, item } = req.body;
    try {
        const updatedFavorito = await Favorito.findOneAndUpdate(
            { _id: id, userId },
            { item },
            { new: true }
        );
        if (!updatedFavorito) {
            return res.status(404).json({ error: 'Favorito not found' });
        }
        res.json(updatedFavorito);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// delete favorito
export const deleteFavorito = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const deletedFavorito = await Favorito.findOneAndDelete({ _id: id, userId });
        if (!deletedFavorito) {
            return res.status(404).json({ error: 'Favorito not found' });
        }
        res.json({ message: 'Favorito deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const favoritesControllers ={
    getAllFavoritosUser,
    addFavorito,
    updateFavorito,
    deleteFavorito,
}
export default favoritesControllers;





