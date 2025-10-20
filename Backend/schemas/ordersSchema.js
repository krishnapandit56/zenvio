const mongoose = require('mongoose')

const schema = new mongoose.Schema({
fullname:String,
contactnumber:Number,
contactemail:String,
city:String,
pincode:String,
address:String,
quantity:Number,
date:String,
username:String,
customerusername:String,
productid:String,
productname:String,
imageurl:String,
price:Number
})

const model = mongoose.model('orders',schema)

module.exports = model