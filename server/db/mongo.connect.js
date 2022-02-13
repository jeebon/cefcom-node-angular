const mongoose = require("mongoose");
const config = require('config');
const dbConfig = config.get('database');

async function connect() {
  console.log("DB URI: ", dbConfig.uri);
  try {
    const res = await mongoose.connect(dbConfig.uri);
    console.log('Yes! db connected.');
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
}

module.exports = { connect };
