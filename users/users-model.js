const db = require("../data/db-config");

module.exports = {
  insert,
  find
};

function insert(user) {
  return db("users").insert(user);
}

function find() {
  return db("users");
}
