const express = require('express')
const router = express.Router()
const ordersSchema = require('../schemas/ordersSchema')
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,async(req ,res)=>{
const username = req.body.username

if(req.body.customer){
    const array =  await ordersSchema.find({customerusername:username}).sort({_id:-1})
    res.json({array})
}
else{
    const array =  await ordersSchema.find({username}).sort({_id:-1})
res.json({array})
}


    

})


module.exports = router