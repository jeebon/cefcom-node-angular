module.exports = {
  database: {
    uri: `mongodb://${process.env.MONGODB_SERVER}:27017/cefcom`,
  },
  staticDir: {
    productImg: "product"
  },
  JWT: {
    JWT_SECRET: process.env.JWT_SECRET || 'thetokenwillbereplaced',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || 3600000
  }
};
