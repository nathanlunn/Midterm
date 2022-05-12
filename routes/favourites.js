
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const user = 1 || req.session.user_id;
    const queryString = `
    SELECT title, description, price, photo_url, is_sold, posted_time, users.name as posted_by, items.id as id
    FROM favourite_items
    JOIN items ON items.id = item_id
    JOIN users ON users.id = owner_id
    WHERE user_id = $1
    `;
    db.query(queryString, [user])
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
