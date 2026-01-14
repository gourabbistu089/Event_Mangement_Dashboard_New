const { sendError } = require('../utils/response');

const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 401, 'Not authorized');
    }
    
    if (!roles.includes(req.user.role)) {
      return sendError(res, 403, 'Access denied. Insufficient permissions');
    }
    
    next();
  };
};

module.exports = { checkRole };