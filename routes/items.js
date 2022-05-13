
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
    if (!req.session.user_id) {
      res.redirect('/login');
    }
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

  router.get("/:item_id", (req, res) => {

    const item_id = req.params.item_id;
    const user_id = req.session.user_id;

    if (!user_id) {
      res.redirect('/login');
      return;
    }

    db.query(`SELECT items.*, users.name, users.email, users.phone FROM items JOIN users ON owner_id = users.id WHERE items.id = $1;`, [item_id])
      .then(data => {
        const itemAndOwner = data.rows[0];

        let favourites = 'test';

        db.query(`SELECT user_id FROM favourite_items WHERE item_id = $1;`, [item_id])
          .then(data => {
            favourites = data.rows;

            console.log(favourites)
            let favourite = false;
            for (let user of favourites) {
              if (user.user_id === user_id) {
                favourite = true;
              }
            }

            const templateVars = { itemAndOwner, sent:false, favourite };
            // *** can be implemented when cookie and  implemented ***
            if (user_id === itemAndOwner.owner_id) {
              console.log('test');
              return res.redirect('/my_postings');
            }
            return res.render('single_item', templateVars);
            })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/favourite', (req, res) => {
    res.send(req.body);
  });

  return router;
};
