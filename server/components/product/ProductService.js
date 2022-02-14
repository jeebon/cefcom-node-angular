const Product = require('./Product');
const bcrypt = require('bcrypt');

const NotFoundException = require('../../error/NotFoundException');
const { randomString } = require('../../shared/generator');
const TokenService = require('../../auth/TokenService');
const {
  aggregateResultWithCountParser,
  aggregateFacetGenerator
} = require('../../shared/mongooseHelper');

const save = async (body) => {
  const { name, description, imageUrl } = body;
  const item = { name, description, imageUrl };
  return await Product.create(item);
};

const getItem = async (id) => {
  const item = await Product.findById(id);
  if (!item) {
    throw new NotFoundException('Product not found');
  }
  return item;
};

const getItems = async (page, size, filters, authenticatedUser) => {
  let aggregate = Product.aggregate();
  if (filters.name !== '') {
    aggregate = aggregate.match({
      "$or": [
        { name: new RegExp(filters.name.toString().trim(), 'i') }
      ]
    });
  }

  const data = await aggregate.facet(aggregateFacetGenerator((page * size), size)).exec();
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
  getItem,
  getItems
};
