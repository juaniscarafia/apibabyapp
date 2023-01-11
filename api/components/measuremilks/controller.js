const err = require("../../../utils/error");
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    console.log("aca");
    store = require("../../../store/sqlite");
  }

  async function list() {
    const dataMeasureMilks = await store.listMeasureMilks();
    return dataMeasureMilks;
  }

  async function listMilks() {
    const dataMilks = await store.listMilks();
    return dataMilks;
  }

  async function insertMeasureMilks(data) {
    const dataInsertMeasureMilks = await store.insertMeasureMilks(data);
    return dataInsertMeasureMilks;
  }

  async function updateMeasureMilks(data) {
    const dataUpdateMeasureMilks = await store.updateMeasureMilks(data);
    return dataUpdateMeasureMilks;
  }

  return {
    list,
    listMilks,
    insertMeasureMilks,
    updateMeasureMilks
  };
};
