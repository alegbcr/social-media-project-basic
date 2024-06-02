const express = require("express");

const config = require("../config");
const router = require("./network");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/", router);

app.listen(config.mysqlService.port, () => {
  console.log(`MySQL service is running on port ${config.mysqlService.port}`);
});

module.exports = app;
