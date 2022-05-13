
const express = require('express');
const router  = express.Router();
// const { getYourItems } = require('helpers')
const getItems = function (db, userIDCookie) {
  //test implementation with res.cookie

    let queryString = `
    SELECT title, description, price, photo_url, is_sold, posted_time, users.name as posted_by, items.id as id
    FROM items
    JOIN users ON users.id = owner_id
    WHERE is_deleted = false AND owner_id = $1
    ORDER BY posted_time DESC
    `;

    return db.query(queryString, [userIDCookie])
      .then(data => {
        const items = data.rows;
        return items
      })

}

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log('testing');
    let userIDCookie = req.session.user_id;
    console.log(userIDCookie);

    let promiseOne = getItems(db, userIDCookie)
    Promise.all([promiseOne])
      .then(result => {
        const templateVars = { items: result[0] }
        return res.render('my_postings', templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
