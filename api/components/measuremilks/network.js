const express = require("express");
const response = require("../../../network/response");
const controller = require("./index");
const error = require("../../../utils/error");
const router = express.Router();

//RUTAS LOCALES

router.get("/", list);

//FUNCIONES INTERNAS
async function list(req, res, next) {
  try {
    let lista = await controller.list();
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
