'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GuideSchema = new Schema({
//    _id: {
//      type: Schema.Types.ObjectId,
//    default: new mongoose.Types.ObjectId
//    },
    title: {
        type:String,
        index: true,
        unique: true,
        required: true
    },
    user: {
        type: String,
        index: true,
        required: true
    },
    tags: [String],
    content: {
        type: String,
        index: true,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    votes: {
        type: [String], 
        default: [] 
    },
    image: {
    type: [String]
    },
    banner: {
        type: String
    }
});

module.exports = mongoose.model('Guide', GuideSchema);
