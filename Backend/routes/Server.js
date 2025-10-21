const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config({path:'../env/.env'})
const cookieparser = require('cookie-parser')

const mongourl=process.env.MONGOURL

const Signup = require('./Signup')
const sendotp = require('./sendotp')
const verifyotp = require('./verifyotp')
const sendotpseller = require('./sendotpseller')
const signupasseller = require('./signupasseller')
const signin = require('./signin')
const signinasseller = require('./signinasseller')
const addProduct = require('./addProduct')
const getdata = require('./getdata')
const deleteproduct = require('./deleteproduct')
const editProduct = require('./editProduct')
const logout = require('./logout')
const searchproduct = require('./searchproduct')
const viewproduct = require('./viewproduct')
const addtocart = require('./addtocart')
const getcart = require('./getcart')
const removecart = require('./removecart')
const confirmorder = require('./confirmorder')
const fetchOrders = require('./fetchOrders')
const addrecentsearch = require('./addrecentsearch')
const fetchrecentsearch = require('./fetchrecentsearch')

app.use(cors({origin:'http://localhost:5173',credentials:true})) 
app.use(express.json()) 
app.use(cookieparser()) //// this is require to read cookies
 

app.use('/Signup',Signup)
app.use('/sendotp',sendotp)
app.use('/verifyotp',verifyotp)
app.use('/sendotpseller',sendotpseller)
app.use('/signupasseller',signupasseller)
app.use('/signin',signin)
app.use('/signinasseller',signinasseller)
app.use('/addProduct',addProduct)
app.use('/getdata',getdata)
app.use('/deleteproduct',deleteproduct)
app.use('/editProduct',editProduct)
app.use('/logout',logout)
app.use('/searchproduct',searchproduct)
app.use('/viewproduct',viewproduct)
app.use('/addtocart',addtocart)
app.use('/getcart',getcart)
app.use('/removecart',removecart)
app.use('/confirmorder',confirmorder)
app.use('/fetchOrders',fetchOrders)
app.use('/addrecentsearch',addrecentsearch)
app.use('/fetchrecentsearch',fetchrecentsearch)

// //////////////////////// CONNECTING MONGODB //////////////////////////////
async function connectdb(){
    try{
 await mongoose.connect(mongourl,

)
 console.log('Mongodb Connected !!') 
}
catch(e){
console.log('Mongodb Not Connected , error is : ',e)
 
}
}
connectdb();

///////////////////////////////////////////////////////////////////////////

app.listen(7000,()=>{
    console.log('App running on port 7000')
})
 