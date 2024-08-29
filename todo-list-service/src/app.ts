import express from "express";
import axios from "axios";
import { TodoModel } from "./model";
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(async (req, res, next) => {
  try {
    await axios.get("http://localhost:8081", { timeout: 10000 });
    next();
  } catch {
    console.error("Failed to reach auth service");
    res.status(500).json({ message: "Failed to reach auth service" });
  }
});

app.get("/", async (req, res) => {
  try {
    console.log('Running "getAll" ', process.env.ENV1);
    const todos = await TodoModel.findAll();
    res.status(200).json(todos.map((item) => item.dataValues));
  } catch (error) {
    res.status(500).json({ message: "Error getting todos" });
  }
});

app.get("/:id", async (req, res) => {
  try {
    console.log('Running "getById"');
    const todo = await TodoModel.findByPk(req.params.id);
    if (todo) {
      res.status(200).json(todo.dataValues);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting todo" });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log('Running "create"');
    const todo = await TodoModel.create(req.body);
    res.status(201).json(todo.dataValues);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo" });
  }
});

app.put("/:id", async (req, res) => {
  try {
    console.log('Running "update"');
    const todo = await TodoModel.findByPk(req.params.id);
    await todo?.update(req.body);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    console.log('Running "delete"');
    const todo = await TodoModel.destroy({ where: { id: req.params.id } });
    if (todo) {
      res.status(200).json({ message: "Todo deleted" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting todo, " + error?.message });
  }
});

app.listen(port, () => {
  console.log(`API service is running on port ${port}`);
});

// todo: add middleware that calls auth service
