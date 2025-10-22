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
// NOTE: Ensure 'http://localhost:5173' matches your frontend's exact development port.
const originUrls = isProduction
  ? FRONTEND_PROD_URL // Single string for production
  : [
      'http://localhost:3000',
      'http://localhost:5173', 
      'http://localhost:7000',
      FRONTEND_PROD_URL,
    ];

// --- LOGGING (for deployment debugging) ---
console.log('Environment:', process.env.NODE_ENV);
console.log('isProduction:', isProduction);
console.log('Allowed origins:', originUrls);

// --- MONGODB CONNECTION ---
mongoose
  .connect(MONGOURL) // Removed deprecated options as they are default in Mongoose 6+
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// --- MIDDLEWARES ---

// ✅ FINAL SAFE CORS SETUP: Pass the array/string directly to the origin property.
// The `cors` library handles array checking without crashing the server.
app.use(
  cors({
    origin: originUrls, 
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

app.use(express.json());
app.use(cookieParser());

// --- ROUTES ---
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
// A generic error handler to prevent uncaught exceptions from crashing the process
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.message, err.stack);
  
  // Set status to 500 if headers haven't been sent, otherwise let Express handle it.
  if (res.headersSent) {
    return next(err);
  }
  
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: isProduction ? 'An unexpected error occurred.' : err.message // Hide detailed error in prod
  });
});

// --- START SERVER ---
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(
    `🚀 App running on port ${PORT} in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode.`
  );
});