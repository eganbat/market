var router = require('express').Router();
const passport = require('passport');
const express = require('express');

// The root route renders our only view
router.get('/', function(req, res) {
  // Where do you want to go for the root route
  res.redirect('/shoppers');
});

router.get('/', function(req, res, next) {
  // Where do you want to go for the root route
  res.redirect('/sneakers');
});


router.get('/releases', function(req, res){
  res.render('releases', {
    title: 'Releases'
  });
});

router.get('/login', function(req, res){
  res.render('login', {
    title: 'login'
  });
});

router.get('/stocks', function(req, res){
  res.render('stocks', {
    title: 'Stocks'
  });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/shoppers', // where do you want the client to go after you login 
    failureRedirect : '/shoppers' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/shoppers');
});



module.exports = router;