
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/my_favourites", (req, res) => {

    const queryString = `
    SELECT * FROM favourite_items
    WHERE user_id = $1
    `;
    db.query(queryString, [2])
      .then(data => {
        const items = data.rows;
        res.json({ items });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
