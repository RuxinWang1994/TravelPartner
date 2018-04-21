'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AccommodationSchema = new Schema({
_id: {
     type: Schema.Types.ObjectId,
     default: new mongoose.Types.ObjectId
 },
name: {
     type: String,
    index: true,
    unique: true,
     required: true
  },
email: {
      type: String,
      required:true

 },
phone: {
      type: String,
      required:true
 },
votes: {
       type: [String],
       required: true
   },
price:{
      type:String,
      required:true
   },

 img:[String],
 tags: [String],
 address: String,
 desc:String
 });

 module.exports = mongoose.model('Acco', AccommodationSchema);
