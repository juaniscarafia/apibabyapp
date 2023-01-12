const store = require("../store/sqlite");

async function createBackup(data){
  console.log(`backupDB - ${data.path} - ${data.date}`);
  store.createBackup();
}

module.exports = {
  createBackup
};
