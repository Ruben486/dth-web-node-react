import app from "./app.js";
import userRoutes from "./src/user/routes/userRoutes.js";
import authRoutes from "./src/user/routes/authRoutes.js";
import verifyEmailRoutes from "./src/user/routes/verifyEmailRoutes.js";
import categoriaRoutes from "./src/routes/categoriaRoutes.js";
import productoRoutes from "./src/routes/productoRoutes.js";
import formfileupload from "./src/routes/formFileUpload.js";
import favoritoRoutes from "./src/routes/favoritoRoutes.js";
import mercadoPagoRoutes from "./src/routes/mercadoPagoRoutes.js";
import orderRoutes  from "./src/order/routes/orderRoutes.js";

const rutas = () => {
    app.use("/users",userRoutes);
    app.use('/auth', authRoutes);
    app.use("/auth",verifyEmailRoutes);
    app.use('/categorias', categoriaRoutes);
    app.use('/product', productoRoutes);
    app.use('/favoritos',favoritoRoutes)
    app.use('/loadimage',formfileupload); // provisoria solo de prueba 
    app.use('/mercadopago',mercadoPagoRoutes)
    app.use('/orders',orderRoutes);
}

export default  rutas;
