const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1)",
      [description],
    );

    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("The server has started on the port 5000...");
});
