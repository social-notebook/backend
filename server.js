const express = require('express');
const session = require('express-session');
const passport = require('passport')

require('./db/index');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: 'fdafa',
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 5 //5d
  }
}))
app.use(passport.initialize())
app.use(passport.session())
require('./passportLocal.config')

app.use('/', express.static('./public'))

/* public route */
app.post('/auth/register', (req, res) => {res.send('fdsafsd')})

app.post('/auth/login', 
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/auth/me'
  }),
  (req, res) => {
    res.send('logined')
  })



/* private route */
app.use((req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login')
})

app.get('/auth/me', (req, res) => {
  res.send(req.user)
})


const PORT = process.env.PORT || 3000
app.listen( PORT, _ => console.log(`server start on PORT: ${PORT}`) )