import app from "./app.js";
import conectDB from "./db.js";
import rutas from "./rutas.js";
import "dotenv/config";

const PORT = process.env.PORT || 3500 

rutas()

app.listen(PORT,() => {
  console.log(`Server on port ${PORT}`)
});

conectDB();
 
