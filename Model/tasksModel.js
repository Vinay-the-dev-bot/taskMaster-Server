const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    userId: { type: String, require: true },
    author: { type: String, require: true },
    completed: { type: Boolean, default: false },
  },
  { versionKey: false }
);

const tasksModel = mongoose.model("tasks", tasksSchema);

module.exports = { tasksModel };
