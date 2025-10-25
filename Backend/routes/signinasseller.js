const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userModel = require('../schemas/userSellerSchema');
require('dotenv').config({ path: '../env/.env' });

const secretkey = process.env.SECRETKEY;

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username, password });

    if (user) {
      // Generate JWT
      const token = jwt.sign(
        { username: user.username, userid: user._id },
        secretkey,
        { expiresIn: '1h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7200000,
      });

      return res.json({
        statuscode: 1,
        statusmessage: 'Login successful',
      });
    } else {
      return res.json({
        statuscode: 0,
        statusmessage: 'Invalid Credentials',
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    return res.json({
      statuscode: 0,
      statusmessage: 'Server Error',
    });
  }
});

module.exports = router;
