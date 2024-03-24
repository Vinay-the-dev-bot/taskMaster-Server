const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/userRouter");
const { tasksRouter } = require("./Routes/tasksRouter");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", tasksRouter);

app.get("/", (req, res) => {
  res.send("HOME");
});

app.listen(process.env.PORT, async () => {
  await connection;
  console.log("Connected to DB");
  console.log(`Listening at ${process.env.PORT}`);
});
