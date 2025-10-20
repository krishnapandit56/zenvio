const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const {setotp} = require('./otpstore')
const userModel=require('../schemas/userSellerSchema')

router.post('/',async(req ,res)=>{
    console.log('send otp seller called')
    const email=req.body.email
    const username = req.body.username 
    
    //////////////////////// CHECKING IF USER EXIST OR NOT //////////////////

    const usernamechk = await userModel.findOne({username})
    if(usernamechk){
        res.json({statusmessage:'Username Already Taken !!',statuscode:0})
    }

    const emailchk = await userModel.findOne({email})
    if(emailchk){
       res.json({statusmessage:'Email Already Exist !!',statuscode:0})
    }

    ///////////////////////////////////////////////////////////////////////

    ////////////////////// GENERATE OTP /////////////////////
const otp =  Math.floor(100000 + Math.random() * 900000).toString();
router.otp=otp

///////////////////////////////////SENDING MAIL////////////////////////////
const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
         user:'krishnapandit52005@gmail.com',
         pass:'ytkxrphtfydoakfo'
    }
})

try{
const response=await transport.sendMail({
    from:"krishnapandit52005@gmail.com",
    to:email,
    subject:'OTP For Zenvio ',
    text:`"Your OTP for Zenvio is ${otp} . Use this otp to create account on Zenvio"`
})

res.json({emailstatus:1})
}
catch(e){
res.json({emailstatus:0})
}
//////////////////SETTING OTP FOR BACKEND/////////////////////

setotp(email,otp)



})

module.exports = router