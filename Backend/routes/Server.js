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
  ? [FRONTEND_PROD_URL]
  : [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:7000',
      FRONTEND_PROD_URL,
    ];

// --- LOGGING ---
console.log('Environment:', process.env.NODE_ENV);
console.log('Mongo URL Loaded:', !!MONGOURL);
console.log('isProduction:', isProduction);
console.log('Allowed origins:', originUrls);

// --- MONGODB CONNECTION ---
mongoose
  .connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// --- MIDDLEWARES ---

// ✅ Safe CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow server-to-server or Postman requests
      if (originUrls.includes(origin)) {
        return callback(null, true);
      } else {
        console.error('🚫 Blocked by CORS:', origin);
        return callback(new Error('Not allowed by CORS'));
      }
    },
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
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.message);
  res.status(500).json({ error: err.message });
});

// --- (OPTIONAL) SERVE FRONTEND BUILD ---
// Uncomment if you want Render to serve your frontend directly from here.
/*
const frontendPath = path.join(__dirname, '../../Frontend/App/dist');
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});
*/

// --- START SERVER ---
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(
    `🚀 App running on port ${PORT} in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode.`
  );
});
