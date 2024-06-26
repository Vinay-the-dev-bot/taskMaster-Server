const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    subTasks: {
      type: [{ title: String, completed: { type: Boolean, default: false } }],
      default: [],
    },
    userId: { type: String, require: true },
    author: { type: String, require: true },
    completed: { type: Boolean, default: false },
  },
  { versionKey: false }
);

const tasksModel = mongoose.model("tasks", tasksSchema);

module.exports = { tasksModel };
