import mongoose from "mongoose";
import "dotenv/config"
const connectTo = process.env.MONGO_LOCAL_URL
async function conectDB() {
  try {
    const db = await mongoose.connect(connectTo);
    console.log(connectTo === process.env.MONGO_LOCAL_URL
       ? "Conectado a mongoDB Local"
       : "Conectado a mongoDB Atlas",
       db.connection.name);
  } catch (error) {
    console.log(error);
  }
}

export default conectDB ;
