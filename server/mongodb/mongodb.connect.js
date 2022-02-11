const mongoose = require("mongoose");
async function connect() {
  const DB_URI = `mongodb://${process.env.MONGODB_SERVER}:27017/cefcom`;
  console.log(DB_URI);
  try {
    const res = await mongoose.connect(DB_URI);
    console.log('Yes! db connected.');
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
}

module.exports = { connect };
