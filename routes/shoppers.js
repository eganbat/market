var router = require('express').Router();
var shoppersCtrl = require('../controllers/shoppers');
// const shopper = require('../models/shopper');

router.get('/shoppers', shoppersCtrl.index);
// router.post('/ads', isLoggedIn, shoppersCtrl.addAd);

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();

    res.redirect('/auth/google')
}

module.exports = router;
