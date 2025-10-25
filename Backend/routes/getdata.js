const express = require('express')
const router = express.Router()
const productSchema = require('../schemas/productSchema')
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,async(req,res)=>{
 try{
   const result = await productSchema.find({username:req.body.username})
   console.log('username is : ',req.body.username ,'and products are ',result)
   res.json({result})
 }
 catch(e){
  res.json({message:'Some Error Occured . Could Not Find Data !!'})
 }
 
})

module.exports = router