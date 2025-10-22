const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../env/.env') });

// --- ENVIRONMENT AND CONFIGURATION ---
const isProduction = process.env.NODE_ENV === 'production';
const MONGOURL = process.env.MONGOURL;
const FRONTEND_PROD_URL = 'https://zenvio-h5be.onrender.com';

// Allowed origins
const originUrls = isProduction
    ? FRONTEND_PROD_URL // Single string for production
    : [
        'http://localhost:3000',
        'http://localhost:5173', 
        'http://localhost:7000',
        FRONTEND_PROD_URL,
    ];

// --- LOGGING ---
console.log('Environment:', process.env.NODE_ENV);
console.log('isProduction:', isProduction);
console.log('Allowed origins:', originUrls);

// --- MONGODB CONNECTION ---
mongoose
  .connect(MONGOURL)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// --- MIDDLEWARES ---

// 1. ✅ FINAL CORS SETUP: Use the array directly and handle OPTIONS explicitly.
// This is the most stable configuration for complex requests (like POSTs with credentials).
app.use(
  cors({
    origin: originUrls, 
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // Change success status from 204 to 200, which is sometimes more compatible
    // and can help ensure headers are processed correctly by the browser.
    optionsSuccessStatus: 200 
  })
);

// Explicitly handle OPTIONS preflight for all routes AFTER the cors middleware.
// This ensures any OPTIONS request gets the correct headers from the cors middleware above.
app.options('*', cors()); 

app.use(express.json());
app.use(cookieParser());

// --- ROUTES ---
// (Your routes remain the same)
app.use('/Signup', require('./Signup'));
app.use('/sendotp', require('./sendotp'));
app.use('/verifyotp', require('./verifyotp'));
app.use('/sendotpseller', require('./sendotpseller'));
app.use('/signupasseller', require('./signupasseller'));
app.use('/signin', require('./signin'));
app.use('/signinasseller', require('./signinasseller'));
app.use('/addProduct', require('./addProduct'));
app.use('/getdata', require('./getdata'));
app.use('/deleteproduct', require('./deleteproduct'));
app.use('/editProduct', require('./editProduct'));
app.use('/logout', require('./logout'));
app.use('/searchproduct', require('./searchproduct'));
app.use('/viewproduct', require('./viewproduct'));
app.use('/addtocart', require('./addtocart'));
app.use('/getcart', require('./getcart'));
app.use('/removecart', require('./removecart'));
app.use('/confirmorder', require('./confirmorder'));
app.use('/fetchOrders', require('./fetchOrders'));
app.use('/addrecentsearch', require('./addrecentsearch'));
app.use('/fetchrecentsearch', require('./fetchrecentsearch'));

// --- ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.message, err.stack);
  
  if (res.headersSent) {
    return next(err);
  }
  
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: isProduction ? 'An unexpected error occurred.' : err.message
  });
});

// --- START SERVER ---
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(
    `🚀 App running on port ${PORT} in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode.`
  );
});