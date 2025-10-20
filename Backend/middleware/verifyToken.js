const jwt = require('jsonwebtoken')
require('dotenv').config({path:'../env/.env'})

function verifyToken(req,res,next){
    const token = req.cookies.token
    const secretkey = process.env.secretkey

    if(!token)
    {
        res.json({message:'Token Not Provided !!'})
    }

    try{
        const decodedtoken = jwt.verify(token,secretkey)
        req.username = decodedtoken.username
        console.log('Token Verified Sucessfully !!')
        next()

    }
    catch(err){
        res.json({message:'Invalid Token'})
        console.log('Invalid Token !!')

    }
}

module.exports = verifyToken