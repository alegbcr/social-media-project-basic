// const store = require("../../../store/mysql.js");
const store = require("../../../store/remote-mysql.js");
const controller = require("./controller");

module.exports = controller(store);
