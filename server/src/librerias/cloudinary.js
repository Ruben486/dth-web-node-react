const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config(process.env.CLOUDINARY_URL);

const subirImagen = async (file) => {
  const uploaded = await cloudinary.uploader
    .upload(file.tempFilePath, {
      folder: "images", // Asignamos la carpeta de destino
      public_id: file.name, // Asignamos el nombre del archivo
    })

    .catch((error) => {
      console.log(error);
    });

  // Devolvemos una respuesta con la url del archivo
  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(file.name, {
    fetch_format: "auto",
    quality: "auto",
  });
  // Transform the image: auto-crop to square aspect_ratio

  const autoCropUrl = cloudinary.url(file.name, {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });
  
  // Extraemos la url pública del archivo en cloudinary
  const secure_url = uploaded.secure_url;
  const public_id = uploaded.public_id;

  return {secure_url, public_id};
};
module.exports = { subirImagen };
