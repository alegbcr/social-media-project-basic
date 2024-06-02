const config = require("../../../config.js");

let store;

if (config.remoteDB === true) {
  store = require("../../../store/remote-mysql.js");
} else {
  store = require("../../../store/mysql.js");
}

const controller = require("./controller.js");

module.exports = controller(store);
