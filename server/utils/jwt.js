const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/env');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtSecret, {
    expiresIn: jwtExpire
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };