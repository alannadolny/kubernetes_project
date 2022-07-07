const mongoose = require('mongoose');

ToDoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 50,
  },
  name: {
    type: String,
    required: true,
    maxlength: 10,
  },
  done: {
    type: Boolean,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('ToDo', ToDoSchema);
