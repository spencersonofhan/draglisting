"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Add rating score
const PostSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
},
{
  collection: 'posts'
});

module.exports = mongoose.model('Posts', PostSchema);
