'use strict'
//define transportation part schematypes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let TransportationSchema = new Schema({

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
