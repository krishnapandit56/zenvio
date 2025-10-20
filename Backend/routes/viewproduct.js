const express = require('express');
const productSchema = require('../schemas/productSchema');
const router = express.Router();
const userSellerSchema = require('../schemas/userSellerSchema')

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await productSchema.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const sellername = product.username;
    const seller = await userSellerSchema.findOne({username:sellername})
    console.log(seller)
    res.json({product,seller});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
