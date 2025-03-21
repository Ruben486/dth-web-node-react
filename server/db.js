import mongoose from "mongoose";
import "dotenv/config"

async function conectDB() {
  try {
    const db = await mongoose.connect(process.env.DB_URL);
    console.log("Conectado a mongoDB Atlas", db.connection.name);
  } catch (error) {
    console.log(error);
  }
}

export default conectDB ;
