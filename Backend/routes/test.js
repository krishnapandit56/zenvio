const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

router.post("/testtoken", verifyToken, (req, res) => {
    console.log('username is :' ,req.username)
  res.json({ username: req.username });
});

module.exports = router