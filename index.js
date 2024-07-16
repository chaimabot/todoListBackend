const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const TodoModel = require("./models/Todo");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.post("/add", (req, res) => {
  const { todos } = req.body;

  TodoModel.create({ todos })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/getTask", (req, res) => {
  TodoModel.find({})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", async (req, res) => {
  const { todos } = req.body;
  const taskId = req.params.id;

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      taskId,
      { todos },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/delete/:id", (req, res) => {
  const taskId = req.params.id;

  TodoModel.findByIdAndDelete(taskId)
    .then(() => res.json({ message: "Task deleted successfully" }))
    .catch((err) => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
