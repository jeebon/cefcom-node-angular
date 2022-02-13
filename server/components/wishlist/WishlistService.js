const Wishlist = require('./Wishlist');
const bcrypt = require('bcrypt');
const ObjectId = require('mongoose').Types.ObjectId

const NotFoundException = require('../../error/NotFoundException');
const { randomString } = require('../../shared/generator');
const TokenService = require('../../auth/TokenService');
const {
  aggregateResultWithCountParser,
  aggregateFacetGenerator
} = require('../../shared/mongooseHelper');

const save = async (body, userId) => {
  const { product } = body;
  const item = { user: userId, product };
  return await Wishlist.create(item);
};

const findByUserIdAndProductId = async (productId, userId) => {
  return await Wishlist.findOne({ user: ObjectId(userId), product: ObjectId(productId) });
};

const getItem = async (id) => {
  const item = await Wishlist.findById(id);
  if (!item) {
    throw new NotFoundException('Item not found');
  }
  return item;
};

const getItems = async (page, size, authenticatedUser) => {
  console.log('authenticatedUserId', authenticatedUser._id);
  let aggregate = Wishlist.aggregate().match({
    user: ObjectId(authenticatedUser._id)
  });
  const data = await aggregate.facet(aggregateFacetGenerator((page * size), size)).exec();
  const { items, totalCount } = aggregateResultWithCountParser(data)
  return {
    items: items,
    page,
    size,
    total: Math.ceil(totalCount / size),
  };
};

module.exports = {
  save,
  findByUserIdAndProductId,
  getItem,
  getItems
};
