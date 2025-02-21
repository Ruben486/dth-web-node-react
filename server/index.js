const { app } = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 3500 
const conectDB = require("./db")
const { rutas } = require("./rutas");

rutas()

app.listen(PORT,() => {
    console.log(`Server on port ${PORT}`)
});
conectDB();
 
