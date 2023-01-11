const express = require("express");
const serverless = require('serverless-http');
const bodyParser = require("body-parser");
const config = require("../config.js");
const login = require("./components/login/network");
const measureMilks = require("./components/measuremilks/network");
const errors = require("../network/errors");
const err = require("../utils/error.js");
const cors = require("cors");
const router = express.Router();

const app = express();
app.use(bodyParser.json());

//CORS
app.use(cors());

// RUTAS
// app.use("/api/productos/Ec", productosEC);
app.use('/.netlify/functions/index', router); 
app.use("api/login", login);
app.use("api/measuremilks", measureMilks);

app.use(errors);
app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto ", config.api.port);
});

module.exports = app;
module.exports.handler = serverless(app);