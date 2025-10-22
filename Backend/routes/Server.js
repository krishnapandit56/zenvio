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
