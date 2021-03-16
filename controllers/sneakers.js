const Sneaker = require('../models/sneaker');
// const Shopper = require('../models/shopper');

module.exports = {
  index,
  show,
  new: newSneaker,
  create,
  delete: deleteSneaker,
  release
};

function deleteSneaker(req, res){
   if(req.user){
    Sneaker.findByIdAndDelete(req.params.id).then(function(){
      console.log('sneaker deleted');
      res.redirect('/sneakers')
    }) 
    } else {
      res.render('login', {title: 'login'})
    }};
    

function index(req, res) {
    Sneaker.find({}, function(err, sneakers) {
      console.log(sneakers);
      res.render('sneakers/index', { title: 'All Sneakers', sneakers });
    });
  }
  

  function show(req, res) {
    Sneaker.findById(req.params.id, function(err, sneaker) {
      res.render('sneakers/show', { title: 'Sneaker Detail', sneaker });
    });
  }

  function release(req, res) {
      res.render('sneakers/release', {title: 'Sneaker News' });
  }

  function newSneaker(req, res){
    if(req.user){
      res.render('sneakers/new', {title: 'Add Sneaker'})
    } else {
      res.render('login', {title: 'login'})
    }
  }
  
  function create(req, res) {
    req.body.owner = req.user._id
    const sneaker = new Sneaker(req.body);
    sneaker.save(function(err) {
      console.log(err);
      // one way to handle errors
      if (err) return res.redirect('/sneakers/new');
      console.log(sneaker);
      // for now, redirect right back to new.ejs
      res.redirect(`/sneakers/${sneaker._id}`);
    });
  }
