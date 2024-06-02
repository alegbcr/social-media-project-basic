const express = require("express");

const config = require("../config.js");

const post = require("./components/post/network.js");

const errors = require("../network/errors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/post", post);

// MIDDLEWARE
app.use(errors);

app.listen(config.post.port, () =>
  console.log(`Post Server is listenning in port ${config.post.port}`)
);

module.exports = app;
