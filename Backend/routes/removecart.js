const express = require('express')
const router = express.Router()
const cartschema = require('../schemas/cartSchema')
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,async (req,res)=>{

const username = req.username
const productid = req.body.productid 

try{
    const result = await cartschema.deleteOne({productid:productid})
    res.json({removestatus:1,message:'Product Removed From Cart'})

}
catch(e){
    res.json({removestatus:0,cartmessage:'Some Error Occured While Removing'})
}

})
 
module.exports = router