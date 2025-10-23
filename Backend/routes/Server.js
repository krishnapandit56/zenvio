const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../env/.env') });

// --- ENVIRONMENT CONFIGURATION ---
const isProduction = process.env.NODE_ENV === 'production';
const MONGOURL = process.env.MONGOURL;

// --- LOGGING ---
console.log('Environment:', process.env.NODE_ENV);
console.log('isProduction:', isProduction);

// --- MONGODB CONNECTION ---
mongoose
  .connect(MONGOURL)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// --- CORS SETUP ---
const allowedOrigins = [
  'https://zenvio-1.onrender.com', // deployed frontend
  'http://localhost:5173'           // local dev
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Preflight request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// --- MIDDLEWARE ---
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

// --- TEST ROUTE ---
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running 🚀' });
});

// --- ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.message, err.stack);
  if (res.headersSent) return next(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: isProduction ? 'An unexpected error occurred.' : err.message
  });
});

app.use(cors({
  origin: 'https://zenvio-1.onrender.com',  // ✅ your frontend URL
  credentials: true                         // ✅ allow sending cookies
}));

// --- START SERVER ---
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 App running on port ${PORT} in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode.`);
});
