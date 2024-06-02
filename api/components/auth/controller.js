const bcrypt = require("bcryptjs");

const auth = require("../../../auth");

const TABLE = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/mysql");
  }

  async function login(username, password) {
    const data = await store.query(TABLE, { username: username });

    return bcrypt.compare(password, data[0].password).then((isEqual) => {
      if (isEqual === true) {
        return auth.sign(data[0]);
      } else {
        throw new Error("Invalid credentials");
      }
    });
  }

  async function insert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 10);
    }

    return store.insert(TABLE, authData);
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  return {
    login,
    insert,
    remove,
  };
};
