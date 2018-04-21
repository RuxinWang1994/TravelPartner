'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransportationSchema = new Schema({
//  _id: {
//      type: Schema.Types.ObjectId,
//      default: new mongoose.Types.ObjectId
//  },
  name: {
      type: String,
      unique: true,
      required:true
  },
  img:[String],
  desc:String
});
//4 types ,subway lines

module.exports = mongoose.model('Trans', TransportationSchema);
