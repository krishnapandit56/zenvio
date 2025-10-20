const express = require('express')
const router = express.Router()
const userModel = require('../schemas/userSchema')
const {getotp} = require('./otpstore')

router.post('/',async (req,res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const otp = req.body.otp
    const otp1 = getotp(email)
    
    if(otp===otp1){
            const r = userModel({username,email,password})
    const r1 = await r.save()
    res.json({statusmessage:'User Created sucessfully ',statuscode:1})
    }
    else{
        res.json({statusmessage:'wrong OTP',statuscode:0})
    }


    
    }

)

module.exports = router