const express = require('express')
const router = express.Router()
const productSchema = require('../schemas/productSchema')
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,async(req ,res)=>{
 try{
    const _id = req.body.id
 await productSchema.deleteOne({_id})
 res.json({deletestatus:1})
 }
 catch(e){
 res.json({deletestatus:0})
 }
})

module.exports = router