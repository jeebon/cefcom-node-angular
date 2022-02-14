const User = require('./User');
const bcrypt = require('bcrypt');

const NotFoundException = require('../../error/NotFoundException');
const { randomString } = require('../../shared/generator');
const TokenService = require('../../auth/TokenService');
const logger = require('../../shared/logger');
const { aggregateResultWithCountParser } = require('../../shared/mongooseHelper');

const save = async (body) => {
  const { name, email, phone, password } = body;
  const hash = await bcrypt.hash(password, 10);
  const user = { name, email, phone, password: hash };
  return await User.create(user);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundException('user_not_found');
  }
  return user;
};

const getUsers = async (page, size, filters) => {
  const data = await User.aggregate().facet(aggregateFacetGenerator((page * size), size)).exec();
  const { items, totalCount } = aggregateResultWithCountParser(data)
  return {
    items: items,
    page,
    size,
    total: totalCount,
  };
};

module.exports = {
  save,
  findByEmail,
  getUser,
  getUsers
};
