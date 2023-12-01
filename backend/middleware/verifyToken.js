const jwt = require('jsonwebtoken');
require('dotenv').config();


const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key

const verifyToken = (req, res, next) => {
  // console.log(req.headers);
  const token = req.cookies.token;
  if (token==="" || token==null) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;