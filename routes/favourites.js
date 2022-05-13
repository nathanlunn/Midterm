
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post('/', (req, res) => {
    const item_id = parseInt(req.body.item_id);
    const user_id = req.session.user_id;

    db.query(`INSERT INTO favourite_items (user_id, item_id) VALUES ($1, $2)`, [user_id, item_id])
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.post('/delete', (req, res) => {
    const item_id = parseInt(req.body.item_id);
    const user_id = req.session.user_id;

    db.query(`DELETE FROM favourite_items WHERE user_id = $1 AND item_id = $2`, [user_id, item_id])
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.get('/', (req, res) => {

    const queryString = `
    SELECT title, description, price, photo_url, is_sold, posted_time, users.name as posted_by, items.id as id
    FROM favourite_items
    JOIN items ON items.id = item_id
    JOIN users ON users.id = owner_id
    WHERE user_id = $1
    `;
    db.query(queryString, )
      .then(data => {
        const items = data.rows;
        const templateVars = { items }
        res.render('favourites', templateVars);
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
