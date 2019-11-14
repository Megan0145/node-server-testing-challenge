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
      async () => {
        try {
          await Users.insert({ name: "Megan" });
          await Users.insert({ name: "Megan" });
        } catch (error) {
          expect(error.code).toBe("SQLITE_CONSTRAINT");
        }
      };
    });
  });
});
