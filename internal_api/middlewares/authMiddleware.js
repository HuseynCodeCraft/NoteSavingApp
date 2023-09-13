const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user information in the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.isAdminUser = (req, res, next) => {
  const token = req.header('X-Authorization');

  if (!token) {
    return res.status(401).json({ message: 'X-Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    req.user = decoded; // Store admin information in the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid admin token' });
  }
};

