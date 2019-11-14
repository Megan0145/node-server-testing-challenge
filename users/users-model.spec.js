const Users = require("./users-model");
const db = require("../data/db-config");

beforeEach(() => {
  return db("users").truncate();
});

describe("Users model", () => {
  describe("Insert fn", () => {
    test("Should insert user to db", async () => {
      await Users.insert({ name: "New User 1" });
      const users = await db("users");
      expect(users).toHaveLength(1);
    });
    test("Should only allow unique names", () => {
      Users.insert([{ name: "Megan" }, { name: "Megan" }])
        .then()
        .catch(err => {
          expect(err.code).toEqual("SQLITE_CONSTRAINT");
        });
    });
  });

  describe("Delete fn", () => {
    test("Should delete user from db", async () => {
      await Users.insert({ name: "Megan" });
      expect(await Users.find()).toHaveLength(1);
      await Users.remove(1);
      expect(await Users.find()).toHaveLength(0);
    });
    test("Should not allow you to delete non-existent user", async () => {
      expect(await Users.remove(3434)).toBe(0);
    });
  });
});
