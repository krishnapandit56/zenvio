const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:String,
    recentarray:[String]
})

const model = mongoose.model('recentSearch',schema)

module.exports = model 