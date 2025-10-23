const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../env/.env' });

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  const secretkey = process.env.SECRETKEY; // ✅ match .env

  if (!token) {
    return res.status(401).json({ message: 'Token Not Provided !!' });
  }

  try {
    const decodedtoken = jwt.verify(token, secretkey);
    req.username = decodedtoken.username;
    console.log('✅ Token Verified Successfully !!');
    next();
  } catch (err) {
    console.log('❌ Invalid Token !!', err.message);
    return res.status(401).json({ message: 'Invalid Token' });
  }
}

module.exports = verifyToken;
