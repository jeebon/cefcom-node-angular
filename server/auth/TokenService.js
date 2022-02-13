const { randomString } = require('../shared/generator');
const jwt = require('jsonwebtoken');
const config = require('config');
const { promisify } = require('util');

const createToken = (user) => {
  return jwt.sign({ user }, config.get('JWT.JWT_SECRET'), {
    expiresIn: config.get('JWT.JWT_EXPIRES_IN')
  });
};

const verify = async (token) => {
  const decoded = await promisify(jwt.verify)(
    token,
    config.get('JWT.JWT_SECRET')
  );
  return decoded;
};


module.exports = {
  createToken,
  verify
};
