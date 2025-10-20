const express = require('express')
const router = express.Router()
const sendotp = require('./sendotp')



router.post('/',async (req ,res)=>{
    const otp1 = sendotp.otp;
console.log('otp from verify otp is : ',otp1)
})

module.exports = router