const express = require('express')
const productSchema = require('../schemas/productSchema')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,async(req,res)=>{
 
try{
    
     const r =  productSchema(req.body)
     console.log(req.body)
     const result = await r.save();
     res.json({statuscode:1,statusmessage:'Product Uploaded Sucessfully !!'})
}
catch(e){
     res.json({statuscode:0,statusmessage:'Some Error Occured !! Cannot Upload Product'})
}
 
})

module.exports = router  