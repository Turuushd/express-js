import express from "express";
import * as fs from "fs";

const PORT = 3000;
const app = express();

app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
  const data = fs.readFileSync("./data.json", "utf-8");
  todos = JSON.parse(data);
  res.send(todos);
});

app.post("/todos", (req, res) => {
  const title = req.body.title;
  if (!title) return res.status(400).send({ message: "Title is not found" });
  const newTodo = {
    id: todos[todos.length - 1].id + 1,
    title: title,
    checked: false,
  };
  todos.push(newTodo);
  fs.writeFileSync("./data.json", JSON.stringify(todos), "utf-8");
  return res.send(newTodo);
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ message: "Id not found in body" });
  const todo = todos.find((item) => item.id === Number(id));
  if (!todo) return res.status(400).send({ message: "Todo not found" });
  return res.send(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ message: "Id not found!" });
  const index = todos.findIndex((item) => item.id === Number(id));
  if (index === -1)
    return res.status(400).send({ message: `${Number(id)} tai todo alga` });
  todos.splice(index, 1);
  fs.writeFileSync("./data.json", JSON.stringify(todos), "utf-8");
  return res.status(200).send({ message: `${Number(id)} dh id ustlaa` });
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ message: "Id not found!" });
  // TODO update functions
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
