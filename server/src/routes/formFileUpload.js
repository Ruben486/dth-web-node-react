import express from "express";
import { subirImagen } from "../librerias/cloudinary.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end(`<h1>Upload Your File Here :)</h1>
    <form
        action="/loadimage"
        method="post" 
        enctype="multipart/form-data"
    >
        <fieldset>
            <legend>Upload your file</legend>
            <label for="photo">File:</label>
            <input type="file" name="file" id="file" />
        </fieldset>
        <button type="submit">Upload</button>
    </form>`);
});

// ACCION DISPARADA POR EL FORMULARIO
router.post("/", async (req, res) => {
  // Validamos que nos envíen algún archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  try {
    // Extraemos el archivo de la request
    // el nombre "file" debe coincidir
    // con el valor del atributo name del input

    const file = req.files.file;
    // Extraemos la extensión del archivo
    const extension = file.mimetype.split("/")[1];

    // Aquí validamos alguna extensión en particular
    // cualquier otra, devolverá un error
    const validExtensions = ["png", "pdf", "jpg", "jpeg", "webp"];
    if (!validExtensions.includes(extension)) {
      return res.status(400).send("Not valid file extension");
    }

    // Extraemos la url pública del archivo en cloudinary */

    const { secure_url, public_id } = await subirImagen(file);
    res.send(
      `<p>File uploaded to cloudinary!</p>
        <a href="${secure_url}">File here</a>`
    );
  } catch (error) {
    res.send(error);
  }
});

export default router;
