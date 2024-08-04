const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.db.url);
    console.log(
      `${process.env.TEST_DB == "0" ? "" : "Test "}MongoDB Connected: ${
        conn.connection.host
      }`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
