const fs = require('fs');
const mongoose = require('mongoose');
const Product = require('../../components/product/Product');
const mongodb = require("../mongo.connect");
mongodb.connect();


const products = JSON.parse(fs.readFileSync(`${__dirname}/collections/products.json`, 'utf-8'));

const importAll = async () => {
  try {
    await Product.create(products, { validateBeforeSave: false });
    console.log('Demo products successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteAll = async () => {
  try {
    await Product.deleteMany();
    console.log('All product successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import-all') {
  importAll();
} else if (process.argv[2] === '--delete-all') {
  deleteAll();
}
