const mongoose = require('mongoose')

const schema = mongoose.Schema({
  password: String,
  username: String,
  notebookIDs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
})

module.exports = mongoose.model("User", schema)