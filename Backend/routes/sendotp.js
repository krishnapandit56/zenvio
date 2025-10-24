const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { setotp } = require('./otpstore');
const userModel = require('../schemas/userSchema');

router.post('/', async (req, res) => {
  const { email, username } = req.body;
  if (!email || !username)
    return res.json({ statusmessage: 'Invalid input', statuscode: 0 });

  try {
    if (await userModel.findOne({ username }))
      return res.json({ statusmessage: 'Username Already Taken !!', statuscode: 0 });
    if (await userModel.findOne({ email }))
      return res.json({ statusmessage: 'Email Already Exist !!', statuscode: 0 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setotp(email, otp);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Zenvio" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Your OTP for Zenvio',
      text: `Your OTP for Zenvio is ${otp}. Use this OTP to create your account.`,
    });

    return res.json({
      statusmessage: 'OTP Sent Successfully!',
      emailstatus: 1,
      statuscode: 1,
    });
  } catch (err) {
    console.error('❌ Error sending OTP:', err);
    return res.json({
      statusmessage: 'Error sending OTP. Try again later.',
      statuscode: 0,
      emailstatus: 0,
      error: err.message,
    });
  }
});

module.exports = router;
