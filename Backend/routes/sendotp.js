const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { setotp } = require('./otpstore');
const userModel = require('../schemas/userSchema');

router.post('/', async (req, res) => {
  console.log('send otp called');

  const { email, username } = req.body;

  try {
    //////////////////////// CHECK IF USER EXISTS //////////////////
    const usernamechk = await userModel.findOne({ username });
    if (usernamechk) {
      return res.json({
        statusmessage: 'Username Already Taken !!',
        statuscode: 0,
      });
    }

    const emailchk = await userModel.findOne({ email });
    if (emailchk) {
      return res.json({
        statusmessage: 'Email Already Exist !!',
        statuscode: 0,
      });
    }

    ////////////////////// GENERATE OTP /////////////////////
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setotp(email, otp); // store it before sending mail

    ////////////////////// SEND MAIL ///////////////////////
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'krishnapandit52005@gmail.com',
        pass: 'ytkxrphtfydoakfo',
      },
    });

    await transport.sendMail({
      from: 'krishnapandit52005@gmail.com',
      to: email,
      subject: 'OTP For Zenvio',
      text: `Your OTP for Zenvio is ${otp}. Use this OTP to create your account.`,
    });

    console.log(`OTP sent successfully to ${email}: ${otp}`);

    return res.json({
      emailstatus: 1,
      statuscode: 1,
      statusmessage: 'OTP Sent Successfully!',
    });
  } catch (e) {
    console.error('Error in /sendotp:', e);
    return res.json({
      emailstatus: 0,
      statuscode: 0,
      statusmessage: 'Error sending OTP. Try again.',
    });
  }
});

module.exports = router;
