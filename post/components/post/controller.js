const { faker } = require("@faker-js/faker");
// const auth = require("../auth");

const TABLE = "post";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/mysql");
  }

  function list() {
    return store.list(TABLE);
  }

  async function get(id) {
    return await store.get(TABLE, id);
  }

  async function insert(body, userId) {
    const post = {
      id: faker.string.nanoid({ min: 13, max: 32 }),
      text: body.text,
      user: userId,
    };
    console.log(post);

    return await store.insert(TABLE, post);
  }

  async function update(id, body) {
    const post = {
      text: body.text,
    };

    return await store.update(TABLE, id, post);
  }

  async function remove(id) {
    return await store.remove(TABLE, id);
  }

  return {
    list,
    get,
    insert,
    update,
    remove,
  };
};
