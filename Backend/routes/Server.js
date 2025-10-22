const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

// NOTE: Ensure your .env file is correctly located relative to this server.js file.
// The path '../../env/.env' suggests two levels up, then into an 'env' folder.
require('dotenv').config({ path: path.join(__dirname, '../../env/.env') });

// --- ENVIRONMENT AND CONFIGURATION ---

const isProduction = process.env.NODE_ENV === 'production';
const MONGOURL = process.env.MONGOURL;
const FRONTEND_PROD_URL = 'https://zenvio-h5be.onrender.com';

// Define allowed origins based on the environment
const originUrls = isProduction
    ? FRONTEND_PROD_URL
    : [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:7000',
        FRONTEND_PROD_URL
      ];

// ... (MONGODB CONNECTION)

// --- MIDDLEWARES ---

// 1. SIMPLIFIED CORS Configuration
// This is less prone to throwing uncaught errors in the callback function.
app.use(cors({
    origin: originUrls, // Pass the array/string directly to the origin property
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// 2. Body Parsers
app.use(express.json());
app.use(cookieParser());

// --- ROUTES --- 
// Ensure file names match exactly (case-sensitive)
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

// --- SERVE FRONTEND (if needed) ---
/*
// Uncomment this section if your server is also responsible for serving the built frontend files.
const frontendPath = path.join(__dirname, '../../Frontend/App/dist');

// Serve static files from the frontend build directory
app.use(express.static(frontendPath));

// CATCH-ALL ROUTE for React Router (must be AFTER all API routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});
*/

// --- START SERVER ---

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT} in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode.`);
});