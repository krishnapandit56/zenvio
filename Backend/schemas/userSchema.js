const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
})

const model = mongoose.model('users',schema)

module.exports = model