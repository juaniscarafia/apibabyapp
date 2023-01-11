const express = require("express");
const response = require("../../../network/response");
const controller = require("./index");
const error = require("../../../utils/error");
const router = express.Router();

//RUTAS LOCALES

router.get("/", list);
router.get("/all", listAll);
router.get("/milks", listMilks);
router.post("/insertmeasure", insertMeasureMilks);
router.put("/updatemeasure/:id", updateMeasureMilks);

//FUNCIONES INTERNAS
async function list(req, res, next) {
  try {
    let lista = await controller.list();
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
}

async function listAll(req, res, next) {
  try {
    let lista = await controller.listAll();
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
}

async function listMilks(req, res, next) {
  try {
    let lista = await controller.listMilks();
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
}

async function insertMeasureMilks(req, res, next) {
  try {
    const data = req.body;
    let lista = await controller.insertMeasureMilks(data);
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
}

async function updateMeasureMilks(req, res, next) {
  try {
    const Id = parseInt(req.params.id);
    const data = req.body;
    let lista = await controller.updateMeasureMilks({
      ...data,
      Id
    });
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
