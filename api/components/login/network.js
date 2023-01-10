const express = require("express");
const response = require("../../../network/response");
const controller = require("./index");
const error = require("../../../utils/error");
const router = express.Router();

//RUTAS LOCALES

router.post("/", login);

//FUNCIONES INTERNAS
async function login(req, res, next) {
  try {
    const data = req.body;
    let access = await controller.login(data);

    if (access === 'Acceso denegado!') {
      response.error(req, res, access, 400);
    }
    response.success(req, res, access, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
