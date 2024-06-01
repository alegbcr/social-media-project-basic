const express = require("express");

const response = require("../network/response");
const Store = require("../store/mysql");

const router = express.Router();

// ROUTES
router.get("/:table/", list);
router.get("/:table/:id", get);
router.post("/:table/", insert);
router.patch("/:table/:id", update);
router.delete("/:table/:id", remove);

// FUNCTIONS
async function list(req, res, next) {
  const data = await Store.list(req.params.table);
  response.success(req, res, data, 200);
}

async function get(req, res, next) {
  const data = await Store.get(req.params.table, req.params.id);
  response.success(req, res, data, 200);
}

async function insert(req, res, next) {
  const data = await Store.insert(req.params.table, req.body);
  response.success(req, res, data, 200);
}

async function update(req, res, next) {
  const data = await Store.update(req.params.table, req.params.id, req.body);
  response.success(req, res, data, 200);
}

async function remove(req, res, next) {
  const data = await Store.remove(req.params.table, req.params.id);
  response.success(req, res, data, 200);
}

module.exports = router;
