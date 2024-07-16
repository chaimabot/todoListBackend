const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todos: [String],
});

const TodoModel = mongoose.model("Todo", TodoSchema);

module.exports = TodoModel;
