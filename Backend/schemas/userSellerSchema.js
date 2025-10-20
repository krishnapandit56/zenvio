const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    ownername:String,
    ownerphonenumber:Number,
    email:String,
    username:String,
    password:String,
    storename:String,
    state:String,
    city:String,
    address:String,
    storephonenumber:String
})

const model = mongoose.model('sellers',schema)

module.exports = model