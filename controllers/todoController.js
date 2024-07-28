// const Todo = require('../models/Todo');

// exports.createTodo = async (req, res) => {
//   try {
//     const todo = new Todo({
//       title: req.body.title,
//       completed: false,
//       userId: req.user.id // Use req.user.id
//     });
//     await todo.save();
//     res.status(201).send(todo);
//   } catch (error) {
//     console.error('Create todo error:', error);
//     res.status(500).send({ message: 'Failed to create todo', error });
//   }
// };

// exports.getTodos = async (req, res) => {
//   const todos = await Todo.find({ userId: req.user._id });
//   res.status(200).json(todos);
// };


// exports.updateTodo = async (req, res) => {
//   try {
//     const todo = await Todo.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.id },
//       req.body,
//       { new: true }
//     );
//     if (!todo) {
//       return res.status(404).send({ message: 'To-Do not found' });
//     }
//     res.status(200).send(todo);
//   } catch (error) {
//     res.status(500).send({ message: 'Failed to update todo', error });
//   }
// };

// exports.deleteTodo = async (req, res) => {
//   const { id } = req.params;
//   await Todo.findByIdAndDelete(id);
//   res.status(200).json({ message: 'Todo deleted successfully' });
// };

const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).send({ message: 'Title is required' });
    }

    const todo = new Todo({
      title,
      completed: false,
      userId: req.user.id
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(500).send({ message: 'Failed to create todo', error });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch todos', error });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!todo) {
      return res.status(404).send({ message: 'To-Do not found' });
    }
    res.status(200).send(todo);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).send({ message: 'Failed to update todo', error });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!todo) {
      return res.status(404).send({ message: 'To-Do not found' });
    }
    res.status(200).send({ message: 'To-Do deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete todo', error });
  }
};
