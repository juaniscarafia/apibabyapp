const err = require("../../../utils/error");
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    console.log("aca");
    store = require("../../../store/sqlite");
  }

  async function login(data) {
    const access = await store.login(data);
    return access;
  }

  return {
    login
  };
};
