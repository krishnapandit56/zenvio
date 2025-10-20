const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const userModel = require('../schemas/userSchema')
require('dotenv').config({path:'../env/.env'})

const secretkey = process.env.SECRETKEY

router.post('/',async(req ,res)=>{
const user= await userModel.findOne(req.body)

if(user){
/////////////////////// GENERATING TOKEN //////////////////////
    const token = jwt.sign({username:req.body.username,userid:user._id},secretkey,{expiresIn:"1h"});

    res.cookie('token',token,{
      httpOnly:true,
      secure:false,
      sameSite:'lax',
      maxAge:7200000
    })
     
    res.json({status:1})
//////////////////////////////////////////////////////////////
}
if(!user){
    res.json({status:0,statusmessage:'Invalid Credentials'})
}
})

module.exports = router