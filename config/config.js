const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  db: {
    url:
      process.env.TEST_DB == "0"
        ? process.env.MONGO_URI
        : process.env.MONGO_TESTDB_URI,
  },
};
