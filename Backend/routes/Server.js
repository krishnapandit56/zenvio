const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../env/.env') }); // adjust if .env location changes

// MONGODB CONNECTION
const mongourl = process.env.MONGOURL;

async function connectdb() {
  try {
    await mongoose.connect(mongourl);
    console.log('MongoDB Connected !!');
  } catch (e) {
    console.log('MongoDB Not Connected, error:', e);
  }
}
connectdb();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// CORS — only enable localhost in development
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
}

// ROUTES — ensure file names match exactly (case-sensitive)
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

// SERVE FRONTEND (React build from Vite)
const frontendPath = path.join(__dirname, '../../Frontend/App/dist');
app.use(express.static(frontendPath));

// CATCH-ALL ROUTE for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// START SERVER
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
