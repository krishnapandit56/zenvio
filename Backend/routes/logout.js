const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')

router.post('/',(req,res)=>{
    console.log('called')
 res.clearCookie("token",{
    httpOnly:true,
      secure:false,
      sameSite:'lax',
 })
 res.json({message:'Logout'})
})

module.exports = router