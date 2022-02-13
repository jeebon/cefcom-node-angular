const app = require("./app");
//const TokenService = require('./auth/TokenService');
const logger = require('./shared/logger');
const mongodb = require("./db/mongo.connect");
mongodb.connect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info('app is running. port: ' + PORT);
});
