const express = require('express');
const router = express.Router();
const productschema = require('../schemas/productSchema');
const recentSchema = require('../schemas/recentSearchSchema');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, async (req, res) => {
  const username = req.username;
  

  try {
    const result = await recentSchema.findOne({ username });

    if (!result || !Array.isArray(result.recentarray) || result.recentarray.length === 0) {
      return res.json({ searchstatus: 0, message: "No recent searches found", products: [] });
    }

    const array = result.recentarray;

    // Fetch all products for each search term
    const allSearchResults = await Promise.all(
      array.map(async (searchtext) => {
        return productschema
          .find({ $text: { $search: searchtext } }, { score: { $meta: "textScore" } })
          .sort({ score: { $meta: "textScore" } });
      })
    );

    // Flatten the nested arrays into a single array
    const mergedProducts = allSearchResults.flat();

    // Remove duplicates by _id
    const uniqueProductsMap = new Map();
    mergedProducts.forEach(product => {
      uniqueProductsMap.set(product._id.toString(), product);
    });
    const uniqueProducts = Array.from(uniqueProductsMap.values());

    res.json({ searchstatus: 1, products: uniqueProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ searchstatus: 0, message: "Error fetching recent searches" });
  }
});

module.exports = router;
