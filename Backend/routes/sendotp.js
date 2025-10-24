const express = require('express');
const router = express.Router();
const { setotp } = require('./otpstore');
const userModel = require('../schemas/userSchema');
const SibApiV3Sdk = require('@getbrevo/brevo');

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

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    const sendSmtpEmail = {
      to: [{ email }],
      sender: { name: "Zenvio", email: "youremail@gmail.com" }, // your Brevo-verified email
      subject: "Your OTP for Zenvio",
      textContent: `Your OTP for Zenvio is ${otp}. Use this OTP to complete signup.`,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

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
