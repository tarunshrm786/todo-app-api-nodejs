const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({
    userId: req.user._id,
    title,
  });
  await todo.save();
  res.status(201).json(todo);
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.user._id });
  res.status(200).json(todos);
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
  res.status(200).json(todo);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(200).json({ message: 'Todo deleted successfully' });
};
