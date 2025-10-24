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
    console.log('❌ Missing email or username');
    return res.json({ statusmessage: 'Invalid input', statuscode: 0 });
  }

  // Debug: make sure env vars present
  console.log('DEBUG: MAIL_USER present?', !!process.env.MAIL_USER);
  console.log('DEBUG: MAIL_PASS present?', !!process.env.MAIL_PASS);

  try {
    // --- Check duplicates ---
    if (await userModel.findOne({ username })) {
      console.log('Username exists');
      return res.json({ statusmessage: 'Username Already Taken !!', statuscode: 0 });
    }
    if (await userModel.findOne({ email })) {
      console.log('Email exists');
      return res.json({ statusmessage: 'Email Already Exist !!', statuscode: 0 });
    }

    // --- Generate & store OTP ---
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setotp(email, otp);
    console.log(`Generated OTP: ${otp} for ${email}`);

    // --- Transport: prefer explicit host/port ---
    const transportOptions = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER || 'krishnapandit52005@gmail.com',
        pass: process.env.MAIL_PASS || 'ytkxrphtfydoakfo', // fallback only for local debugging
      },
      // debug: true // you can enable this if you want verbose SMTP logs
    };

    console.log('DEBUG transportOptions:', {
      host: transportOptions.host,
      port: transportOptions.port,
      secure: transportOptions.secure,
      userSet: !!transportOptions.auth.user,
      passSet: !!transportOptions.auth.pass,
    });

    const transporter = nodemailer.createTransport(transportOptions);

    // Verify transport first for clearer error messages
    try {
      await transporter.verify();
      console.log('✅ transporter verified (SMTP connection & auth ok)');
    } catch (verifyErr) {
      console.error('❌ transporter.verify() failed:', verifyErr);
      // return useful info to frontend for debugging (remove in production)
      return res.json({
        statusmessage: 'Error verifying mail transport',
        statuscode: 0,
        emailstatus: 0,
        error: verifyErr.message,
        errorCode: verifyErr.code || null,
      });
    }

    // --- Send mail with a controlled timeout ---
    const mailOptions = {
      from: `"Zenvio" <${transportOptions.auth.user}>`,
      to: email,
      subject: 'OTP For Zenvio',
      text: `Your OTP for Zenvio is ${otp}. Use this OTP to create your account.`,
    };

    const mailPromise = transporter.sendMail(mailOptions);

    const timeoutMs = 15000; // 15s
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Mail send timeout')), timeoutMs)
    );

    await Promise.race([mailPromise, timeoutPromise]);

    console.log('✅ OTP mail sent successfully to', email);
    return res.json({
      statusmessage: 'OTP Sent Successfully!',
      emailstatus: 1,
      statuscode: 1,
    });

  } catch (err) {
    console.error('❌ Error in /sendotp:', err);
    // return the raw error for debugging — remove in production
    return res.json({
      statusmessage: 'Error sending OTP. Try again.',
      statuscode: 0,
      emailstatus: 0,
      error: err.message,
      errorCode: err.code || null,
      stack: err.stack ? err.stack.split('\n').slice(0,4) : undefined
    });
  }
});

module.exports = router;
