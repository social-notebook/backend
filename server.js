const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('./db/index');
const User = mongoose.model('User');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

require('./passportLocal.config')

app.use('/', express.static('./public'))

/* public route */
app.post('/auth/register', (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) return res.send({msg: 'missing username or password'})
  User.findOne({username}).then( user => {
    if (user) return res.send({msg: `User was registered!`})
    User.create({username, password}).then( user => {
      let token = jwt.sign({ username }, 'hackathon');
      res.send({token, user})
    })
  })
})

app.post('/auth/login', (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) return res.send({msg: 'missing username or password'})
  User.findOne({username}).then(user => {
    if (!user) return res.send({msg: 'User not exist!'})
    if (user.password !== password) return res.send({msg: 'Password not match!'})
    let token = jwt.sign({ username }, 'hackathon');
    res.send({token, user})
  })
})


/* private route */
app.use((req, res, next) => {
  const { token } = req.query;
  if (!token) return res.send({msg: 'Not yet Authorized!'})
  jwt.verify(token, 'hackathon', function(err, decoded) {
    User.findOne({username: decoded.username}).then(user => {
      req.user = user;
      next()
    })
  });
})

app.get('/auth/me', (req, res) => {
  res.send(req.user)
})


const PORT = process.env.PORT || 3000
app.listen( PORT, _ => console.log(`server start on PORT: ${PORT}`) )