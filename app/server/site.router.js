'use strict'

const bcrypt = require('bcrypt');
const router = require('express').Router();

const token = require('../lib/token');

//router.use((req, res, next) => { next(); });

router.get('/info', (req, res, next) => {
    res.json({ data: 456 });
});

router.post('/signup', (req, res, next) => {

});

router.post('/signin', (req, res, next) => {
    let User = req.app.locals.db.model('User');
    let content = req.body;

    User.find({ 'name': content.username })
        .exec()
        .then(async (users) => {
            return new Promise(async (resolve, reject) => {
                if (users.length > 0) {
                    await bcrypt.compare(content.password, users[0].pwd).then((result) => {
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
                    let res = { "data": { "status": "ok", "token": token }};
                    return res;
                });
            } else {
                let res = { "data": { "status": "fail", "msg": "Invalid username or password."}};
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
