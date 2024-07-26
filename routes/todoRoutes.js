const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const todoController = require('../controllers/todoController');

router.post('/todos', auth, todoController.createTodo);
router.get('/todos', auth, todoController.getTodos);
router.put('/todos/:id', auth, todoController.updateTodo);
router.delete('/todos/:id', auth, todoController.deleteTodo);

module.exports = router;
