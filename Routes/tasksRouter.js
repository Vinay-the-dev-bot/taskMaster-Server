const express = require("express");
const { auth } = require("../MiddleWare/auth.Middleware");
const { tasksModel } = require("../Model/tasksModel");
const tasksRouter = express.Router();
const dotenv = require("dotenv").config();
// Adding a Task
tasksRouter.post("/add", auth, async (req, res) => {
  const task = new tasksModel({ ...req.body });
  const tsk = await task.save({ new: true });
  res.send({ msg: "TASK ADDED", tsk });
});

// Reading a Task
tasksRouter.get("/", auth, async (req, res) => {
  const task = await tasksModel.find({ userId: req.body.userId });
  res.send(task);
});

tasksRouter.patch("/complete/:taskId", auth, async (req, res) => {
  const task = await tasksModel.findByIdAndUpdate(
    { _id: req.params.taskId },
    { completed: true }
  );
  res.status(201).send({ msg: "Task Completed" });
});
tasksRouter.get("/:taskId", auth, async (req, res) => {
  const task = await tasksModel.findOne({ _id: req.params.taskId });
  res.send({ task });
});

// Editing a Task
tasksRouter.patch("/:taskId", auth, async (req, res) => {
  const task = await tasksModel.findOne({ _id: req.params.taskId });
  if (task.userId == req.body.userId) {
    switch (req.body.type) {
      case "EDIT_TASK":
        await tasksModel.findByIdAndUpdate(
          { _id: req.params.taskId },
          req.body
        );
        res.send({ msg: "Task Edited" });
        return;
      case "ADD_SUBTASK":
        console.log(req.body);
        if (req.body.subTask) {
          task.subTasks.push(req.body.subTask);
          task.save();
        }
        res.send({ msg: "Task Edited" });
        return;
    }
  } else {
    res.send({ msg: "NOT AUTHORIZED" });
  }
});

// Deleting a Task
tasksRouter.delete("/:taskId", auth, async (req, res) => {
  const task = await tasksModel.findOne({ _id: req.params.taskId });
  if (task) {
    if (task.userId == req.body.userId) {
      await tasksModel.findByIdAndDelete({ _id: req.params.taskId });
      res.send({ msg: "Task Deleted" });
    } else {
      res.send({ msg: "NOT AUTHORIZED" });
    }
  } else {
    res.send({ msg: "Task NOT FOUND" });
  }
});

module.exports = { tasksRouter };
