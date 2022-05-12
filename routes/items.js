
const express = require('express');
const router  = express.Router();
// const helper = require('/helpers')
const getItems = function (db,isFeatured) {
  //test implementation with res.cookie
    // req.session.user_id = 3;
    let stringModifier = ``;

    if (isFeatured) {
      stringModifier = `AND is_featured = true`

    }
    let queryString = `
    SELECT title, description, price, photo_url, is_sold, posted_time, users.name as posted_by, items.id as id
    FROM items
    JOIN users ON users.id = owner_id
    WHERE is_deleted = false ${stringModifier}
    ORDER BY posted_time DESC
    `;

    return db.query(queryString)
      .then(data => {
        // console.log(data);
        const items = data.rows;
        return items
      })

}

module.exports = (db) => {
  router.get("/", (req, res) => {

    //test implementation with res.cookie
    // req.session.user_id = 3;
    let promiseOne = getItems(db)
    let promiseTwo = getItems(db, true)
    Promise.all([promiseOne, promiseTwo])
      .then(result => {
        // console.log(result[1]);
        const templateVars = { items: result[0], featured: result[1] }
        // console.log('template vars', templateVars)
        console.log('items', result)
        return res.render('index', templateVars)
        //  res.json({ items });

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
