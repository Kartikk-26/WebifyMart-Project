//create private and protected apis
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  console.log(auth);

  if (auth && auth.startsWith('Bearer')) {
    try {
      const token = auth.split(' ')[1];
      console.log(token);
      const { id } = jwt.verify(token, 'this-is-my-secret-string');
      const user =  await User.findById(id);
      console.log(user)
      if (user) {
      
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401).json({
        message: 'Token is not valid',
      });
    }
  } else {
    return res.status(404).json({
      message: 'No token found',
    });
  }
};

module.exports = protect;
