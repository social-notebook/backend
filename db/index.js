const mongoose = require('mongoose');
const User = require('./models/user')
const Post = require('./models/post')

mongoose.connect('mongodb://localhost:27017/hackathon')
  .then(() => console.log('ket noi thanh cong'))
  .catch(() => console.log('ket noi that bai'))
