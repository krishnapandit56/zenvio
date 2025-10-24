const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { setotp } = require('./otpstore');
const userModel = require('../schemas/userSchema');

router.post('/', async (req, res) => {
  console.log('✅ /sendotp called');
  console.log('Body:', req.body);

  const { email, username } = req.body;

  if (!email || !username) {
    return res.json({ statusmessage: 'Invalid input', statuscode: 0 });
  }

  try {
    // --- Check if user already exists ---
    const usernamechk = await userModel.findOne({ username });
    if (usernamechk)
      return res.json({ statusmessage: 'Username Already Taken !!', statuscode: 0 });

    const emailchk = await userModel.findOne({ email });
    if (emailchk)
      return res.json({ statusmessage: 'Email Already Exist !!', statuscode: 0 });

    // --- Generate OTP ---
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setotp(email, otp);
    console.log(`Generated OTP: ${otp} for ${email}`);

    // --- Setup Nodemailer Transport ---
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'krishnapandit52005@gmail.com',
        pass: 'ytkxrphtfydoakfo'
      },
    });

    // --- Send Mail with Timeout (prevents hanging) ---
    const mailPromise = transport.sendMail({
      from: 'krishnapandit52005@gmail.com',
      to: email,
      subject: 'OTP For Zenvio',
      text: `Your OTP for Zenvio is ${otp}. Use this OTP to create your account.`,
    });

    // timeout after 10s if Gmail hangs
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Mail send timeout')), 10000)
    );

    await Promise.race([mailPromise, timeoutPromise]);

    console.log(`✅ OTP mail sent successfully to ${email}`);
    return res.json({
      statusmessage: 'OTP Sent Successfully!',
      emailstatus: 1,
      statuscode: 1,
    });
  } catch (err) {
    console.error('❌ Error in /sendotp:', err);
    return res.json({
      statusmessage: err,
      emailstatus: 0,
      statuscode: 0,
    });
  }
});

module.exports = router;
