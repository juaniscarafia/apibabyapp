module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    console.log("aca");
    store = require("../../../store/sql");
  }

  async function list() {
    return await store.list();
  }

  async function listaManager() {
    return await store.listaManager();
  }

  async function listaExplorer() {
    return await store.listaExplorer();
  }

  async function listaLeads() {
    return await store.listaLeads();
  }
  return {
    list,
    listaManager,
    listaExplorer,
    listaLeads,
  };
};
