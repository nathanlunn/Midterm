const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post('/', (req, res) => {
    const item_id = req.body.item_id;
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
    const item_id = req.body.item_id;
    const user_id = req.session.user_id;

    db.query(`DELETE FROM favourite_items WHERE user_id = $1 AND item_id = $2`, [user_id, item_id])
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  return router;
};