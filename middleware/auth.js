// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// module.exports = async (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   const user = await User.findById(decoded.userId);
//   if (!user) {
//     throw new Error('User not found');
//   }
//   req.user = user;
//   next();
// };

// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(403).send({ message: 'No token provided' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(401).send({ message: 'Failed to authenticate token' });
//     }
//     req.user = user; // Set the user object in the request
//     console.log('User info from token:', req.user); // Log user info to debug
//     next();
//   });
// };

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send({ message: 'Failed to authenticate token' });
    }
    req.user = user; // Set the user object in the request
    console.log('User info from token:', req.user); // Log user info to debug
    next();
  });
};
