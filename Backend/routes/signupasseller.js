const express = require('express')
const router = express.Router()
const userModel = require('../schemas/userSellerSchema')
const {getotp} = require('./otpstore')

router.post('/',async (req,res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const ownername=req.body.ownername
    const ownerphonenumber=req.body.ownerphonenumber
    const storename=req.body.storename
    const storephonenumber=req.body.storephonenumber
    const address=req.body.address
    const state=req.body.state
    const city=req.body.city
    const otp = req.body.otp
    const otp1 = getotp(email)
    
    console.log(otp)
    if(otp==otp1){
            const r = userModel({ownername,ownerphonenumber,email,username,password,storename,state,city,address,storephonenumber})
    const r1 = await r.save()
    res.json({statusmessage:'User Created sucessfully ',statuscode:1})
    }
    else{
        res.json({statusmessage:'wrong OTP',statuscode:0})
    }


    
    }

)

module.exports = router