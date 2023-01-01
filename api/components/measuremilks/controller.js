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

  return {
    list
  };
};
