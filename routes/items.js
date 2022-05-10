
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    //test implementation with res.cookie
    // req.session.user_id = 3;
    const queryString = `
    SELECT title, description, price, photo_url, is_sold, posted_time, users.name as posted_by
    FROM items
    JOIN users ON users.id = owner_id
    WHERE is_deleted = false AND is_sold = false
    `;
    db.query(queryString)
      .then(data => {
        // console.log(data);
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
