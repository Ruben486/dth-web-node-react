const express = require("express");
const path = require('path');
const cors = require("cors");
const {default: helmet} = require("helmet")
const morgan = require("morgan")
const responseTime = require("response-time");
const nodeCache = require("node-cache");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");


const app = express();

require('dotenv').config();
const serverCache = new nodeCache();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(responseTime());
// limita la cantidad de peticiones de un mismo usuario //
app.use(express.json({ limit: '20kb'}));

app.use(fileUpload({
    limits: {fileSize: 1024*1024*50},
    useTempFiles: true,
    tempFileDir: "./upload",
    createParentPath: true,
}))

// cors
app.use(cors({
    credentials: true,
    origin: "*",
}));
app.use(bodyParser.urlencoded({extended: true}));

module.exports = {app,serverCache};
