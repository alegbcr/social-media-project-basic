const mysql = require("mysql2/promise");

const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port,
};

const connection = mysql.createPool(dbconfig);

async function handleConnection() {
  try {
    await connection;
    console.log("DB Connected");

    connection.on("error", async (err) => {
      console.error("error: ", err);

      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        handleConnection();
      } else {
        throw err;
      }
    });
  } catch (err) {
    console.error("error: ", err);
    setTimeout(handleConnection, 2000);
  }
}

handleConnection();

async function list(table) {
  try {
    const data = await connection.query(`SELECT * FROM ${table}`);
    return data[0];
  } catch (err) {
    return err;
  }
}

async function get(table, id) {
  try {
    const data = await connection.query(
      `SELECT * FROM ${table} WHERE id=?`,
      id
    );
    return data[0];
  } catch (err) {
    return err;
  }
}

async function insert(table, data) {
  try {
    const user = await connection.query(`INSERT INTO ${table} SET ?`, data);
    return user[0];
  } catch (err) {
    return err;
  }
}

async function update(table, id, data) {
  try {
    const [userUpdated] = await connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, id]
    );

    return userUpdated;
  } catch (err) {
    return err;
  }
}

async function remove(table, id) {
  try {
    await connection.query(`DELETE FROM ${table} WHERE id=?`, id);
    return true;
  } catch (err) {
    return err;
  }
}

async function query(table, query, join) {
  try {
    let joinQuery = "";
    if (join) {
      const key = Object.keys(join)[0];
      const value = join[key];
      joinQuery = `JOIN ${key} ON ${table}.${value} = ${key}.id`;
    }

    const token = await connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      query
    );
    return token[0];
  } catch (err) {
    return err;
  }
}

module.exports = {
  list,
  get,
  insert,
  update,
  query,
  remove,
};
