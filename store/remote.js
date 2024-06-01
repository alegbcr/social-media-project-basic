const axios = require("axios");

function createRemoteDB(host, port) {
  const remoteDatabase = axios.create({
    baseURL: `http://${host}:${port}`,

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  async function list(table) {
    try {
      const response = await remoteDatabase.get(`/${table}`);
      return response.data.body;
    } catch (error) {
      return error;
    }
  }

  async function get(table, id) {
    try {
      const response = await remoteDatabase.get(`/${table}/${id}`);

      return response.data.body;
    } catch (error) {
      return [];
    }
  }

  async function insert(table, data) {
    try {
      const response = await remoteDatabase.post(`/${table}`, data);
      return response.data.body;
    } catch (error) {
      return null;
    }
  }

  async function update(table, id, data) {
    try {
      const response = await remoteDatabase.patch(`/${table}/${id}`, data);
      return response.data.body;
    } catch (error) {
      return null;
    }
  }

  async function remove(table, id) {
    try {
      const response = await remoteDatabase.delete(`/${table}/${id}`);
      return response.data.body;
    } catch (error) {
      return null;
    }
  }

  return {
    list,
    get,
    insert,
    update,
    remove,
  };
}

module.exports = createRemoteDB;
