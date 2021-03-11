const Shopper = require('../models/shopper');

module.exports = {
  index,
  addAd
};

function addAd(req, res){
  console.log(req.user, ' req.user');

  // req.user is the mongoose document of our logged in user
  req.user.ads.push(req.body);
  // if mutate a document we have to save it
  req.user.save(function(err) {
    res.redirect('/shoppers')
  })
}

function index(req, res, next) {
  console.log(req.query)
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  Shopper.find(modelQuery)
  .sort(sortKey).exec(function(err, shoppers) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('shoppers/index', {
      shoppers,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}