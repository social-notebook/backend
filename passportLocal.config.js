const passport = require('passport')
const Local = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = mongoose.model('User');


passport.use(new Local((username, password, done) => {
  return User.create({username, password})
    .then(user => done(null, user))
    .catch(err => done(err, false))
}))


passport.serializeUser((user, done) => done(null, user.username))

passport.deserializeUser((username, done) => {
  return User.findOne({username: username}).then(user => {
    if (user) return done(null, user);
    return done(null, false)
  }).catch(err => done(err, false))
})

