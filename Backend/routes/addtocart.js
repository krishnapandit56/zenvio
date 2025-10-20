const express = require('express')
const router = express.Router()
const cartschema = require('../schemas/cartSchema')
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,async (req,res)=>{
const productid = req.body.productid
const username = req.username

try{
    const result = cartschema({username:username,productid:productid})
    let r = await result.save()
    res.json({cartmessage:'Added To Cart'})
}
catch(e){
    res.json({cartmessage:'Some Error Occured Adding To Cart'})
}

})
 
module.exports = router