const mongoose = require('mongoose')

const schema = mongoose.Schema({
  password: String,
  username: String,
  post_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
})

module.exports = mongoose.model("User", schema)