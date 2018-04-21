'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saltRounds = 10;

let UserSchema = new Schema({
//    _id: {
//        type: Schema.Types.ObjectId,
//        default: new mongoose.Types.ObjectId
//    },
    name: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    pwd: {    //bcrypt
        type: String,
        required: true
    },
    email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        sparse: true
    },
    desc: String,    // Description
    avatar: String,
    tags: [String],
    locations: [String],
    guides: [Schema.Types.ObjectId],
    status: {
        type: Number,
        default: 255
    },
    group: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    msg: {
        from: String,
        created_at: Date,
        content: String
    },
    token : {
        s: {
            type: String,
            default: () => {
                return Math.random().toString(36).substring(2, 15) +
                    Math.random().toString(36).substring(2, 15);
            }
        },
        c: {
            type: Number,
            default: 1000
        }
    }
});

UserSchema.pre('save', async function (next) {
    let User = mongoose.model('User');

    const user1 = await User.where('name').equals(this.name).exec();
    if (user1.length != 0)
        next(new Error('Name Dup'));

    const user2 = await User.where('email').equals(this.email).exec();
    if (user2.length != 0)
        next(new Error('Email Dup'));

    if (this.phone != '') {
        const user3 = await User.where('phone').equals(this.phone).exec();
        if (user3.length != 0)
            next(new Error('Phone Dup'));
    }

    next();
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('pwd')) {
        let self = this;
        console.log(this.pwd);
        await bcrypt.hash(this.pwd, saltRounds).then((hash) => {
            self.pwd = hash;
            console.log(hash);
            next();
        }, (err) => {
            next(err);
        });
    } else {
        next();
    }
});

UserSchema.pre('update', async function (next) {
    //console.log(this);
    //console.log(this.getUpdate().$set.email);

    if (!this.getUpdate().$set.pwd) {
        next();
    } else {
        let self = this;
        await bcrypt.hash(this.getUpdate().$set.pwd, saltRounds).then((hash) => {
            this.getUpdate().$set.pwd = hash;
            console.log(hash);
            next();
        }, (err) => {
            next(err);
        });

    }
});

//let f = async function(pwd) { return await bcrypt.compare(pwd, this.pwd); };

module.exports = mongoose.model('User', UserSchema);


