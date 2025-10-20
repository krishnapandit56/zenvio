const express = require('express')
const router = express.Router()
const productSchema = require('../schemas/productSchema')
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,async(req ,res)=>{
    try{
        const productid = req.body.productid
    const updatedata = req.body.updatedata
    const result = await productSchema.findByIdAndUpdate(productid,{$set:updatedata},{new:true})
    res.json({status:1,message:'Details Updated Sucessfully'})
    }
    catch(e){
     res.json({status:0,message:'An Error Occured While Saving Changes'})
    }
})

module.exports = router