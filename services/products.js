const logger = require('./../util/logger');
const mongoose = require('mongoose');

const Products = mongoose.model('products');

class Product {
  addProduct(payload) {
    return new Promise((resolve, reject) => {
      Products.create(payload)
        .then((product) => {
          resolve({ message: 'Product Created', data: product, code: 200 });
        })
        .catch((err) => {
          reject({ message: 'Unable to add product', code: 400, err });
        });
    });
  }
}

module.exports = Product;
