'use strict';

const bcrypt = require('bcrypt');
const router = require('express').Router();

const token = require('../lib/token');

//router.use((req, res, next) => { next(); });
router.get('/', (req, res, next) => {
    let Site = req.app.locals.db.model('Site');
    let Place = req.app.locals.db.model('Place');

    Site.findOne()
        .exec()
        .then((site) => {
            let locations = site.locations;

            return Place.find({ '_id': { $in: locations }})
                .then((places) => {
                    let ret = [];
                    for (let place of places) {
                        ret.push({
                            name: place.name,
                            geo: place.geo
                        });
                    }
                    return ret;
                });
        }).then((places) => {
            console.log(places);
            res.render('site/index', { places: places });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.get('/info', (req, res, next) => {
    res.json({ data: 456 });
});

router.post('/signup', (req, res, next) => {
    let User = req.app.locals.db.model('User');

    let username = req.body.username;
    let pwd = req.body.pwd;
    let tags = req.body.tags || '';
    let phone = req.body.phone || '';
    let email = req.body.email;
    let locations = req.body.locations || '';

    let referer = req.header('Referer') || '';

    if (username == undefined || username == '') {
        res.json({
            status: 'err',
            error: { type: 'user', msg: 'Username cannot be blank.' }
        });
    }

    if (pwd == undefined || pwd == '') {
        res.json({
            status: 'err',
            error: { type: 'pwd', msg: 'Password cannot be blank.' }
        });
    }

    if (email == undefined || email == '') {
        res.json({
            status: 'err',
            error: { type: 'email', msg: 'Email cannot be blank.' }
        });
    }

    let user = new User({
        name: username,
        pwd: pwd,
        email: email,
        phone: phone,
        avatar: '',
        tags: tags.split(',').filter((v) => v),
        locations: locations.split(',').filter((v) => v)
    });

    //    user.save();
    user.save()
        .then((user) => {
            console.log(234456);
            token.get(user.name).then((token) => {
                res.json({
                    status: 'success',
                    username: user.name,
                    token: token,
                    url: referer
                });
            });
        })
        .catch((err) => {
            if (err.message == 'Name Dup')
                res.json({
                    status: 'err',
                    error: { type: 'name', msg: 'Name is invalid or already taken.' }
                });
            else if (err.message == 'Email Dup')
                res.json({
                    status: 'err',
                    error: { type: 'email', msg: 'Email is invalid or already taken.'}
                });
            else if (err.message == 'Phone Dup')
                res.json({
                    status: 'err',
                    error: { type: 'phone', msg: 'Phone is invalid or already taken.'}
                });
            else
                next(err);
        });

    console.log(user);
});

router.post('/signin', (req, res, next) => {
    let User = req.app.locals.db.model('User');
    let content = req.body;

    User.find({ 'name': content.username })
        .exec()
        .then(async (users) => {
            return new Promise(async (resolve, reject) => {
                if (users.length > 0) {
                    await bcrypt.compare(content.pwd, users[0].pwd).then((result) => {
                        resolve(result);
                    }, (err) => {
                        reject(err);
                    });
                } else {
                    resolve(false);
                }
            });
        })
        .then((result) => {
            if (result == true) {
                return token.get(content.username).then((token) => {
                    let res = { "status": "success", "token": token };
                    return res;
                });
            } else {
                let res = { "status": "err", "msg": "Invalid username or password." };
                return res;
            }
        })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log(err);
        });
});

router.post('/logout', (req, res, next) => {
    
});

module.exports = router;
