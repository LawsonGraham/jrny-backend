const mongoose = require('mongoose');
const validator = require('validator');
const consts = require('../consts');

var Schema = mongoose.Schema;

const productsSchema = new Schema({
  address: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEthereumAddress(value)) {
        throw new Error('Address is invalid');
      }
    },
  },
  productName: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  projecturl: {
    type: String,
    required: true,
    unique: true,
  },
  transactions: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
  },
  owner: {
    type: String,
    require: true
  },
  discount: {
    type: String,
    require: true
  },
});

module.exports = mongoose.model('Product', productsSchema);
