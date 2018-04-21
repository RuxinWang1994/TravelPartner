'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
//  _id: {
//      type: Schema.Types.ObjectId,
//      default: new mongoose.Types.ObjectId
//  },

  title: {
      type: String,
      required: true,
      unique: true
  },
  author: {
      type: String,
      index: true,
      required: true
  },

  commentBody:{
      type:String,
      required:true
  },

  reply:[
    {
      replier: String,
      replyBody: String,
      replyTime: {
        type: Date,
        default: Date.now
      }
    }
  ],
  keyword:{
      type:[String]
  },

  votes: {
      type: [String],
      required: true

  },
  views: {
      type:Number,
      required: true,
      default:0
 },

 created_at: {
     type: Date,
     required:true,
     default: Date.now
 },

 modified_at:{
     type: Date,
     required:true,
     default: Date.now
 }
});

module.exports = mongoose.model('Comment', CommentSchema);
