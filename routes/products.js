const joi = require('joi');
const logger = require('./../util/logger');
const product = require('./../services/products');

const Products = new product();

const addProduct = {
  path: '/api/v1/products',
  method: 'POST',
  config: {
    description: 'Add New Product',
    tags: ['api', 'products'],
    validate: {
      payload: {
        title: joi.string().required(),
        description: joi.string().required(),
      },
    },
    handler: async (request, h) => {
      try {
        const response = await Products.addProduct(request.payload);
        return h.response({
          success: true,
          message: response.message,
          data: response.data,
        }).code(response.code);
      } catch (err) {
        logger.error(err);
        return h.response({
          success: false,
          message: err.message,
          err: err.err
        }).code(err.code);
      }
    },
  }
};

module.exports = [addProduct];
