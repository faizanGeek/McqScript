const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctOpt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('questions', questionsSchema);
