const express = require('express');
const router = express.Router();
const { setotp } = require('./otpstore');
const userModel = require('../schemas/userSellerSchema');
const SibApiV3Sdk = require('@getbrevo/brevo');

router.post('/', async (req, res) => {
  const { email, username } = req.body;
  if (!email || !username)
    return res.json({ statusmessage: 'Invalid input', statuscode: 0 });

  try {
    // ✅ Check if username already exists
    if (await userModel.findOne({ username }))
      return res.json({ statusmessage: 'Username Already Taken !!', statuscode: 0 });

    // ✅ Check if email already exists
    if (await userModel.findOne({ email }))
      return res.json({ statusmessage: 'Email Already Exist !!', statuscode: 0 });

    // ✅ Generate OTP and store
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setotp(email, otp);

    // ✅ Configure Brevo SDK
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // ✅ Compose and send email
    const sendSmtpEmail = {
      to: [{ email }],
      sender: { name: "Zenvio", email: "krishnapandit52005@gmail.com" }, // must be Brevo-verified sender
      subject: "Your OTP for Zenvio",
      textContent: `Your OTP for Zenvio is ${otp}. Use this OTP to complete signup.`,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    // ✅ Response
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
