// Task 3 — Interactive Dynamic Task Dashboard Platform
// Backend: Node.js + Express micro-API with a local JSON database (lowdb)
// Supports full CRUD (Create, Read, Update, Delete) against active data.
const express = require('express');
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ tasks: [] }).write();
const app = express();
app.use(cors());
app.use(express.json());
// CREATE
app.post('/api/tasks', (req, res) => {
  const { title, status } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const task = {
    id: Date.now().toString(),
    title,
    status: status || 'pending',
    createdAt: new Date().toISOString()
  };
  db.get('tasks').push(task).write();
  res.status(201).json(task);
});
// READ (all)
app.get('/api/tasks', (req, res) => {
  res.json(db.get('tasks').value());
});
// READ (one)
app.get('/api/tasks/:id', (req, res) => {
  const task = db.get('tasks').find({ id: req.params.id }).value();
  if (!task) return res.status(404).json({ error: 'not found' });
  res.json(task);
});
// UPDATE
app.put('/api/tasks/:id', (req, res) => {
  const task = db.get('tasks').find({ id: req.params.id });
  if (!task.value()) return res.status(404).json({ error: 'not found' });
  task.assign(req.body).write();
  res.json(task.value());
});
// DELETE
app.delete('/api/tasks/:id', (req, res) => {
  const exists = db.get('tasks').find({ id: req.params.id }).value();
  if (!exists) return res.status(404).json({ error: 'not found' });
  db.get('tasks').remove({ id: req.params.id }).write();
  res.status(204).send();
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Task dashboard API running on port ${PORT}`));
