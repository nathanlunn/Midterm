
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {

    const queryString = `
    SELECT *
    FROM favourite_items
    JOIN items ON items.id = item_id
    WHERE user_id = $1
    `;
    db.query(queryString, [req.session.user_id])
      .then(data => {
        const items = data.rows;
        const templateVars = { items }
        res.render('my_favourites', templateVars);
        // res.json({ items });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
