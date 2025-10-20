const mongoose = require('mongoose')

const schema = new mongoose.Schema({
username:String,
productid:String,

})


const model = mongoose.model('cart',schema)

module.exports = model