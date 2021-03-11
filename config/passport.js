const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Shopper = require('../models/shopper');

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    console.log(profile, "<----- Profile")
    Shopper.findOne({'googleId': profile.id}, function(err, shopper){
      if(err) return cb(err);

      if(shopper){

        return cb(null, shopper);
      } else {

        const newShopper = new Shopper({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        })

        newShopper.save(function(err){
          if(err) return cb(err);
          return cb(null, newShopper)
        })
      }
    })

  }
));

passport.serializeUser(function(shopperDocument, done) {
  done(null, shopperDocument.id);
});

passport.deserializeUser(function(id, done) {
  Shopper.findById(id, function(err, shopper){
    done(err, shopper);
  })
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

});



