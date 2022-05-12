const express = require("express");
const router = express.Router();
// const helper = require('/helpers')
const getItems = function (db, isFeatured) {
  //test implementation with res.cookie
  // req.session.user_id = 3;
  let stringModifier = ``;

  if (isFeatured) {
    stringModifier = `AND is_featured = true`;
  }
  let queryString = `
    SELECT title, description, price, photo_url, is_sold, posted_time, users.name as posted_by, items.id as item_id, users.id as user_id
    FROM items
    JOIN users ON users.id = owner_id
    WHERE is_deleted = false ${stringModifier}
    ORDER BY posted_time DESC
    `;

  return db.query(queryString).then((data) => {
    // console.log(data);
    const items = data.rows;
    return items;
  });
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    //test implementation with res.cookie
    let userID = 3; //|| req.session['user_id'];
    if (userID == null) {
      return res.send("not allowed");
    }
    db.query(`SELECT * FROM users WHERE id = $1`, [userID.toString()])
      .then((userObject) => {
        let promiseOne = getItems(db);
        let promiseTwo = getItems(db, true);
        Promise.all([promiseOne, promiseTwo])
          .then((result) => {
            // console.log(queryUserObject);
            const templateVars = {
              items: result[0],
              featured: result[1],
              userObject,
            };
            // console.log('template vars', templateVars)
            // console.log('items', result)
            return res.render("index", templateVars);
            //  res.json({ items });
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
