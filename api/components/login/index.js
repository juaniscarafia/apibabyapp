const store = require("../../../store/sqlite");
const crtl = require("./controller");

module.exports = crtl(store);
