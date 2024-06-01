const { faker } = require("@faker-js/faker");
const auth = require("../auth");

const TABLE = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/mysql");
  }

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  async function insert(body) {
    const user = {
      name: body.name,
      username: body.username,
    };

    if (body.id) {
      user.id = `${body.id}`;
    } else {
      user.id = faker.string.nanoid({ min: 13, max: 32 });
    }

    if (body.password || body.username) {
      await auth.insert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }

    return store.insert(TABLE, user);
  }

  async function update(id, body) {
    let user = {
      id: id,
      name: body.name,
      username: body.username,
    };

    return store.update(TABLE, id, user);
  }

  async function follow(from, to) {
    return store.insert(`${TABLE}_follow`, { user_from: from, user_to: to });
  }

  async function following(user) {
    const join = {};
    join[TABLE] = "user_to";
    const query = { user_from: user };

    return await store.query(`${TABLE}_follow`, query, join);
  }

  async function remove(id) {
    await store.remove(TABLE, id);
    await auth.remove(id);
    return "User deleted";
  }

  return {
    list,
    get,
    insert,
    update,
    follow,
    following,
    remove,
  };
};
