import app from "./app.js";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import categoriaRoutes from "./src/routes/categoriaRoutes.js";
import productoRoutes from "./src/routes/productoRoutes.js";
import formfileupload from "./src/routes/formFileUpload.js";
import favoritoRoutes from "./src/routes/favoritoRoutes.js";

const rutas = () => {
    app.use("/users",userRoutes);
    app.use('/auth', authRoutes);
    app.use('/categorias', categoriaRoutes);
    app.use('/productos', productoRoutes);
    app.use('/favoritos',favoritoRoutes)
    app.use('/loadimage',formfileupload); // provisoria solo de prueba 
}

export default  rutas;
