// const sql = require("mssql");
// const error = require("../utils/error");
// //BASE DE DATOS

// let config1 = {
//   server: "V-CrmTest-B001",
//   database: "customW-2",
//   user: "UsrSac",
//   password: "INvier973nO",
//   port: 1433,
//   options: {
//     trustServerCertificate: true,
//   },
// };

// /*
// server:IT-DesaBD10
// database: NS_UsuariosRegistrados
// user: "UsrSac",
// password: "INvier973nO",
// */

// // Conexiones

// let pool1;



// function handleConPool1() {
//   pool1 = new sql.ConnectionPool(config1);
//   pool1
//     .connect()
//     .then(function () {
//       console.log("Conectado a SQL base: " + config1.database);
//     })
//     .catch(function (err) {
//       console.error("[db error]", err);
//       setTimeout(handleConPool1, 2000);
//     });

//   pool1.on("error", (err) => {
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//       handleConPool1();
//     } else {
//       throw error(err);
//     }
//   });
// }

// handleConPool1();

// function queryExample() {
//   return new Promise((resolve, reject) => {
//     let id = "08";
//     var sqlQuery = "select * from PRODUCTOS where  TipoProducto=@id";
//     var req = new sql.Request(pool1);
//     req.input("id", sql.VarChar, id);
//     return req
//       .query(sqlQuery)
//       .then(function (recordset) {
//         return resolve(recordset.recordsets[0]);
//       })
//       .catch(function (err) {
//         return reject(err);
//       });
//   });
// }

// function list() {
//   return new Promise((resolve, reject) => {
//     var req = new sql.Request(pool1);
//     req
//       .execute("usp_ProductosEc_SEEK")
//       .then(function (recordset) {
//         return resolve(recordset.recordsets[0]);
//       })
//       .catch(function (err) {
//         return reject(err);
//       });
//   });
// }

// function listaManager() {
//   return new Promise((resolve, reject) => {
//     var req = new sql.Request(pool1);
//     req
//       .execute("usp_ProductosEcManager_SEEK")
//       .then(function (recordset) {
//         return resolve(recordset.recordsets[0]);
//       })
//       .catch(function (err) {
//         return reject(err);
//       });
//   });
// }

// function listaExplorer() {
//   return new Promise((resolve, reject) => {
//     var req = new sql.Request(pool1);
//     req
//       .execute("usp_ProductosEcExplorer_SEEK")
//       .then(function (recordset) {
//         return resolve(recordset.recordsets[0]);
//       })
//       .catch(function (err) {
//         return reject(err);
//       });
//   });
// }

// function listaLeads() {
//   return new Promise((resolve, reject) => {
//     var req = new sql.Request(pool1);
//     req
//       .execute("usp_ProductosEcLeads_SEEK")
//       .then(function (recordset) {
//         return resolve(recordset.recordsets[0]);
//       })
//       .catch(function (err) {
//         return reject(err);
//       });
//   });
// }

// function listRestringidos(data) {
//   return new Promise((resolve, reject) => {
//     var req = new sql.Request(pool1);
//     req.input("TipoProducto", sql.VarChar, data.tipo ? data.tipo : null);
//     req.input(
//       "FamiliaProducto",
//       sql.VarChar,
//       data.familia ? data.familia : null
//     );
//     req.input("CodigoProducto", sql.VarChar, data.codigo ? data.codigo : null);
//     req.input(
//       "CodigoFiltro",
//       sql.VarChar,
//       data.codigoFiltro ? data.codigoFiltro : null
//     );
//     req
//       .execute("usp_ProductoRestringido_SEEK")
//       .then(function (recordset) {
//         return resolve(recordset.recordsets[0]);
//       })
//       .catch(function (err) {
//         return reject(err);
//       });
//   });
// }

// function addRestringido(data) {
//   return new Promise((resolve, reject) => {
//     var req = new sql.Request(pool1);
//     req.input("TipoProducto", sql.VarChar, data.tipo);
//     req.input("FamiliaProducto", sql.VarChar, data.familia);
//     req.input("CodigoProducto", sql.VarChar, data.codigo);
//     req
//       .execute("usp_ProductoRestringido_ADD")
//       .then(function (recordset) {
//         return resolve("Producto agregado como restringido");
//       })
//       .catch(function (err) {
//         return reject(err);
//       });
//   });
// }

// function removeRestringido(data) {
//   return new Promise((resolve, reject) => {
//     var req = new sql.Request(pool1);
//     req.input("TipoProducto", sql.VarChar, data.tipo);
//     req.input("FamiliaProducto", sql.VarChar, data.familia);
//     req.input("CodigoProducto", sql.VarChar, data.codigo);
//     req
//       .execute("usp_ProductoRestringido_DELETE")
//       .then(function (recordset) {
//         return resolve("El Producto ya no esta restringido");
//       })
//       .catch(function (err) {
//         return reject(err);
//       });
//   });
// }

// module.exports = {
//   list,
//   listaManager,
//   listaExplorer,
//   listaLeads,
//   listRestringidos,
//   addRestringido,
//   removeRestringido,
// };
