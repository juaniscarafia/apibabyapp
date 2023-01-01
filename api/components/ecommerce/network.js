const express = require("express");
const response = require("../../../network/response");
const controller = require("./index");
const error = require("../../../utils/error");
const router = express.Router();

//RUTAS LOCALES

router.get("/", list);
router.get("/Manager", listaManager);
router.get("/Explorer", listaExplorer);
router.get("/Leads", listaLeads);

//FUNCIONES INTERNAS

async function list(req, res, next) {
  try {
    let lista = await controller.list();
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
}

async function listaManager(req, res, next) {
  try {
    let lista = await controller.listaManager();
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
}

async function listaExplorer(req, res, next) {
  try {
    let lista = await controller.listaExplorer();
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
}

async function listaLeads(req, res, next) {
  try {
    let lista = await controller.listaLeads();
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
