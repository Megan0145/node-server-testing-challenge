const db = require("../data/db-config");

module.exports = {
  insert,
  find,
  findById
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

function find() {
  return db("users");
}
