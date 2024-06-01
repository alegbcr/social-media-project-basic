const store = require("../../../store/mysql.js");
const controller = require("./controller.js");

module.exports = controller(store);
