const express = require('express')
const router = express.Router()
const productSchema = require('../schemas/productSchema')
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,async(req,res)=>{
 try{
   const result = await productSchema.find({username:req.body.username})
   res.json({result})
 }
 catch(e){
  res.json({message:'Some Error Occured . Could Not Find Data !!'})
 }
 
})

module.exports = router