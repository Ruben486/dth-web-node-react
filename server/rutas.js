const {app} = require("./app.js");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const categoriaRoutes = require("./src/routes/categoriaRoutes");
const productoRoutes   = require("./src/routes/productoRoutes");
const formfileupload = require("./src/routes/formFileUpload");
const favoritoRoutes = require("./src/routes/favoritoRoutes");
const rutas = () => {
    app.use("/users",userRoutes);
    app.use('/auth', authRoutes);
    app.use('/categorias', categoriaRoutes);
    app.use('/productos', productoRoutes);
    app.use('/favoritos',favoritoRoutes)
    app.use('/loadimage',formfileupload); // provisoria solo de prueba 
}

module.exports = {rutas};
