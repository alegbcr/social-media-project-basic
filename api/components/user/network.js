const express = require("express");

const secure = require("./secure");
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

// ROUTES
router.get("/", list);
router.get("/:id", get);
router.get("/:id/following", secure("logged"), following);
router.post("/", insert);
router.post("/follow/:id", secure("logged"), follow);
router.patch("/:id", secure("update"), update);
router.delete("/:id", secure("logged"), remove);

// FUNTIONS
function list(req, res, next) {
  Controller.list()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function insert(req, res, next) {
  Controller.insert(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch(next);
}

function update(req, res, next) {
  Controller.update(req.params.id, req.body)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function follow(req, res, next) {
  Controller.follow(req.user.id, req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function following(req, res, next) {
  Controller.following(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function remove(req, res, next) {
  Controller.remove(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

module.exports = router;
