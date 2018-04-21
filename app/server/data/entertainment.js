'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EntertainmentSchema = new Schema({
//  _id: {
//      type: Schema.Types.ObjectId,
//      default: new mongoose.Types.ObjectId
//  },

  img: String,

  title: {
    type: String,
    required: true
  },

  details: {
    descrip: String,
    when: String,
    where: String
  },

  ticketInfo:{
    discount: String,
    link: String
  }
});

module.exports = mongoose.model('Spot', EntertainmentSchema);
