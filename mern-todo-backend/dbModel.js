const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  todo: String,
});

module.exports = mongoose.model("todolist", todoSchema); // 'todolist', will be the name of the collections in MongoDB
