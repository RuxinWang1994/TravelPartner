'use strict';

const router = require('express').Router();

router.use('/s', require('./site.router'));
router.use('/u', require('./user.router'));
router.use('/p', require('./place.router'));
router.use('/a', require('./accommodation.router'));
router.use('/c', require('./comment.router'));
router.use('/e', require('./entertainment.router'));
router.use('/f', require('./food.router'));
router.use('/g', require('./guide.router'));
router.use('/t', require('./transportation.router'));

router.all('/', (req, res) => {
    res.redirect('/s');
});

module.exports = router;
