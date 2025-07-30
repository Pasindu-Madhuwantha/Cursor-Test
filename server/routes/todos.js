const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo
} = require('../controllers/todoController');

// GET all todos
router.get('/', getTodos);

// GET single todo
router.get('/:id', getTodo);

// POST create new todo
router.post('/', createTodo);

// PUT update todo
router.put('/:id', updateTodo);

// DELETE todo
router.delete('/:id', deleteTodo);

module.exports = router; 