const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../env/.env' });
const cookieparser = require('cookie-parser');
const path = require('path');

// MONGODB CONNECTION
const mongourl = process.env.MONGOURL;

async function connectdb() {
  try {
    await mongoose.connect(mongourl);
    console.log('Mongodb Connected !!');
  } catch (e) {
    console.log('Mongodb Not Connected, error:', e);
  }
}
connectdb();

// MIDDLEWARES
app.use(express.json());
app.use(cookieparser());

// CORS — only enable localhost in development
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
}

// ROUTES
app.use('/Signup', require('./routes/Signup'));
app.use('/sendotp', require('./routes/sendotp'));
app.use('/verifyotp', require('./routes/verifyotp'));
app.use('/sendotpseller', require('./routes/sendotpseller'));
app.use('/signupasseller', require('./routes/signupasseller'));
app.use('/signin', require('./routes/signin'));
app.use('/signinasseller', require('./routes/signinasseller'));
app.use('/addProduct', require('./routes/addProduct'));
app.use('/getdata', require('./routes/getdata'));
app.use('/deleteproduct', require('./routes/deleteproduct'));
app.use('/editProduct', require('./routes/editProduct'));
app.use('/logout', require('./routes/logout'));
app.use('/searchproduct', require('./routes/searchproduct'));
app.use('/viewproduct', require('./routes/viewproduct'));
app.use('/addtocart', require('./routes/addtocart'));
app.use('/getcart', require('./routes/getcart'));
app.use('/removecart', require('./routes/removecart'));
app.use('/confirmorder', require('./routes/confirmorder'));
app.use('/fetchOrders', require('./routes/fetchOrders'));
app.use('/addrecentsearch', require('./routes/addrecentsearch'));
app.use('/fetchrecentsearch', require('./routes/fetchrecentsearch'));

// ✅ Serve Frontend (React build)
app.use(express.static(path.join(__dirname, '../../frontend/app/dist')));

// ✅ Handle React Router (catch-all route)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/app/dist', 'index.html'));
});

// START SERVER
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
