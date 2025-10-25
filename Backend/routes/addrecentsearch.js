const express = require('express');
const router = express.Router();
const recentSearchSchema = require('../schemas/recentSearchSchema');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, async (req, res) => {
  try {
    const username = req.username;
    const keyword = req.body.keyword;

    // Add the new keyword at the start and keep only latest 4 items
if (keyword && keyword.trim() !== "") {
  await recentSearchSchema.updateOne(
  { username },
  [
    { 
      $set: {
        recentarray: { 
          $slice: [
            { 
              $concatArrays: [
                [keyword],
                { $ifNull: ["$recentarray", []] } // <-- handle null
              ] 
            }, 
            4
          ]
        }
      }
    }
  ],
  { upsert: true }
);

}


    res.json({ status: 1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 0, error: "Server error" });
  }
});

module.exports = router;
