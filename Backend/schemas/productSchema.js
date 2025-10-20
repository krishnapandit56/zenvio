const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    productname:String,
    imageurl:String,
    category:String,
    subcategory:String,
    sizes:[String],
    material:String,
    price:Number,
    quantity:Number,
    username:String,
    deliverytime:Number,
    availablecities:String

})

schema.index({
    productname:"text",
    category:"text",
    subcategory:"text",
    material:"text"
})

const model = mongoose.model('products',schema)

module.exports = model