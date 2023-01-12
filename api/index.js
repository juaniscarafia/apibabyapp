const express = require("express");
const bodyParser = require("body-parser");
const config = require("../config.js");
const login = require("./components/login/network");
const measureMilks = require("./components/measuremilks/network");
const createBackup = require("../utils/backupDB");
const errors = require("../network/errors");
const err = require("../utils/error.js");
const cors = require("cors");
// const cron = require('node-cron');

const app = express();
app.use(bodyParser.json());

// Corre cada 1 minuto
// cron.schedule('* * * * *', () => {
//   const date = new Date(new Date().toLocaleString('es-AR', {timeZone: 'America/Argentina/Buenos_Aires'}));
//   console.log(`running a task every minute ${date}`);
// });

//           # ┌────────────── second (optional)
//           # │ ┌──────────── minute
//           # │ │ ┌────────── hour
//           # │ │ │ ┌──────── day of month
//           # │ │ │ │ ┌────── month
//           # │ │ │ │ │ ┌──── day of week
//           # │ │ │ │ │ │
//           # │ │ │ │ │ │
//           # * * * * * *
// cron.schedule('10 16 * * *', () => {
//   const date = new Date(new Date().toLocaleString('es-AR', {timeZone: 'America/Argentina/Buenos_Aires'}));
//   console.log(`${date}`);
//   createBackup({
//     pathBKP: config.pathBKP,
//     date
//   });
//   console.log(bkp);
// }, {
//   scheduled: true,
//   timezone: "America/Argentina/Buenos_Aires"
// });

//CORS
app.use(cors());

// RUTAS
app.use("/api/login", login);
app.use("/api/measuremilks", measureMilks);

app.use(errors);
app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto ", config.api.port);
});
