const express = require('express')
const router = express.Router()
const ordersSchema = require('../schemas/ordersSchema')
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,async(req ,res)=>{
    const fullname = req.body.fullname;
    const contactnumber = req.body.contactnumber
    const contactemail = req.body.contactemail
    const city = req.body.city
    const pincode = req.body.pincode
    const address = req.body.address
    const quantity = req.body.quantity
    const date = req.body.date
    const username = req.body.seller
    const customerusername = req.username
    const productid = req.body.productid
    const productname = req.body.productname
    const imageurl=req.body.imageurl
    const price=req.body.price

  console.log(productname,imageurl,price)

    const result = ordersSchema({fullname,contactnumber,contactemail,city,pincode,address,quantity,date,username,customerusername,productid,productname,imageurl,price})
    const r = await result.save()

    if(!result){
        
        res.json({status:0,ordermessage:'Some Error occured '})
    }
    else{
        res.json({status:1,ordermessage:'Order placed ✓'})
    }
    

    

})


module.exports = router