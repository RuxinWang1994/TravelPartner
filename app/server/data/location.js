'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LocationSchema = new Schema({
//    _id: {
//        type: Schema.Types.ObjectId,
//        default: new mongoose.Types.ObjectId
//    },
    name: {
        type: String,
        required: true
    },
    desc: String,
    panoramas: [String],
    imgs: [String],
    banner: String,
    geo: {
        type: Schema.Types.Mixed,
        unique: true,
        required: true
    },
    /**
     * Fields inside geo:
     *
     * text: String,
     * lat: Number,
     * lng: Number
     */
    tags: [String],
    hotels: [Schema.Types.ObjectId],
    foods: [Schema.Types.ObjectId],
    accos: [Schema.Types.ObjectId],
    trans: [Schema.Types.ObjectId],
    guides: [Schema.Types.ObjectId],
    spots: [Schema.Types.ObjectId],
    votes: [String]
});

module.exports = mongoose.model('Place', LocationSchema);
