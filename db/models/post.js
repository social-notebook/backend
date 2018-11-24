const mongoose = require('mongoose')

const PositionSchema = mongoose.Schema({
  x: Number,
  y: Number,
})

const highlightSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  position: [PositionSchema],
  range: [Number],
  content: String
})

const schema = mongoose.Schema({
  title: String,
  description: String,
  content: Object,
  highlights: [highlightSchema]

})

module.exports = mongoose.model("Post", schema)