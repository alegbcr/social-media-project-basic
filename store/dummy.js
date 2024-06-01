const db = {
  users: [
    { id: "1", name: "John" },
    { id: "2", name: "Jane" },
  ],
};

async function list(table) {
  return db[table] || [];
}
async function get(table, id) {
  let user = await list(table);
  return user.filter((item) => item.id === id)[0] || null;
}

async function upsert(table, data) {
  if (!db[table]) db[table] = [];

  db[table].push(data);

  return data;
}

async function update(table, id, data) {
  let user = await get(table, id);

  if (user.id !== data.id) {
    user.id = data.id;
  }

  if (user.name !== data.name) {
    user.name = data.name;
  }

  if (user.username !== data.username) {
    user.username = data.username;
  }

  return user;
}

async function remove(table, id) {
  if (db[table] && Array.isArray(db[table])) {
    const index = db[table].findIndex((item) => item.id === id);
    if (index !== -1) {
      db[table].splice(index, 1);
    }
  }

  return col;
}

async function query(table, question) {
  let col = await list(table);
  let keys = Object.keys(question);
  let key = keys[0];

  return col.filter((item) => item[key] === question[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  update,
  remove,
  query,
};
