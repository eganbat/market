const Sneaker = require('../models/sneaker');
// const Shopper = require('../models/shopper');

module.exports = {
  index,
  show,
  new: newSneaker,
  create,
  delete: deleteSneaker
};

function deleteSneaker(req, res){
    
    Sneaker.findByIdAndDelete(req.params.id).then(function(){
      console.log('sneaker deleted');
      res.redirect('/sneakers')
    });
  }


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


  function newSneaker(req, res){
    if(req.user){
      res.render('sneakers/new', {title: 'Add Sneaker'})
    } else {
      res.redirect(`back`)
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
