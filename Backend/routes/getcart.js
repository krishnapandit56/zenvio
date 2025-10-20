const express = require('express')
const router = express.Router()
const cartschema = require('../schemas/cartSchema')
const productSchema = require('../schemas/productSchema')
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,async (req,res)=>{

const username = req.username

try{
    const result = await cartschema.find({username:username})
    const productids = result.map(item=>item.productid) /////get roduct ids of each product
    const cartarray = await productSchema.find({_id:{$in:productids}})
    
    res.json({cartarray})
}
catch(e){
    res.json({cartmessage:'Some Error Occured Adding To Cart'})
}

})
 
module.exports = router