const mongoose = require('mongoose');
const consts = require('../consts');

var Schema = mongoose.Schema;

const projectsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  totalShares: {
    type: Number,
    required: true,
  },
  raiseGoal: {
    type: Number,
    required: true,
  },
  raiseCurrent: {
    type: Number,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  projectInfo: {
    type: String,
    required: true,
  },
  totalTransactions: {
    type: String,
    required: true,
  },
  minInvestment: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Project', projectsSchema);
