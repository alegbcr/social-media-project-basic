const express = require("express");

const secure = require("../../../api/components/user/secure");
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

// ROUTES
router.get("/", list);
router.get("/:id", get);
router.post("/", secure("logged"), insert);
router.patch("/:id", update);
router.delete("/:id", remove);

// FUNCTIONS
function list(req, res, next) {
  Controller.list()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function insert(req, res, next) {
  Controller.insert(req.body, req.user.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function update(req, res, next) {
  Controller.update(req.params.id, req.body)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function remove(req, res, next) {
  Controller.remove(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

module.exports = router;
