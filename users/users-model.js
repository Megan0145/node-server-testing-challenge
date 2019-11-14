const db = require("../data/db-config");

module.exports = {
  insert,
  find,
  findById,
  remove
};

function insert(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return findById(ids[0]);
    });
}

function findById(id) {
  return db("users").where({ id });
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

function find() {
  return db("users");
}
