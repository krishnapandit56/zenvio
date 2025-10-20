const express = require('express')
const router = express.Router()
const productschema = require('../schemas/productSchema')
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,async (req,res)=>{
const searchtext = req.query.searchtext
console.log(searchtext)

try{
    const searchproduct = await productschema.find(
    {$text:{$search:searchtext}},
    {score:{$meta:"textScore"}}
).sort({score:{$meta:"textScore"}})

res.json({searchproduct})
}
catch(e){
    res.json({searchstatus:0,searchmessage:'An Error Occured While Searching'})
}

})

module.exports = router