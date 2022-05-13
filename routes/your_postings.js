
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
    let userIDCookie = req.session.user_id;

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

  router.post('/:item_id', (req, res) => {
        const itemID = req.params.item_id
        console.log('sold test')
        const queryString2 = `
        UPDATE items
        SET is_sold = true
        WHERE id = $1
        `;
        db.query(queryString2, [itemID])
        .then(data => {
          res.redirect('/my_postings')
        });
      });
    
      router.post('/deleted/:item_id', (req, res) => {
        const itemID = req.params.item_id;
        console.log('deleted test')
        const queryString2 = `
        UPDATE items
        SET is_deleted = true
        WHERE id = $1
        `;
        db.query(queryString2, [itemID])
        .then(data => {
          res.redirect('/my_postings')
        });
      });
  return router;
};

// const express = require('express');
// const router  = express.Router();

// module.exports = (db) => {
//   router.get('/', (req, res) => {
//     const cookie = 1 || req.session.user_id;
//     const queryString = `
//     SELECT title, description, price, photo_url, is_sold, posted_time, is_deleted, users.name as posted_by, items.id as id
//     FROM items
//     JOIN users ON users.id = owner_id
//     WHERE owner_id = $1
//     `;
//     db.query(queryString, [cookie])
//       .then(data => {
//         const items = data.rows;
//         const templateVars = { items }
//         res.render('my_postings', templateVars);
//         // res.json({ items });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });

//   router.post('/:item_id', (req, res) => {
//     const itemID = req.params.item_id
//     const queryString2 = `
//     UPDATE items
//     SET is_sold = true
//     WHERE id = $1
//     `;
//     db.query(queryString2, [itemID])
//     .then(data => {
//       res.redirect('/my_postings')
//     });
//   });

//   router.post('/deleted/:item_id', (req, res) => {
//     const itemID = req.params.item_id
//     const queryString2 = `
//     UPDATE items
//     SET is_deleted = true
//     WHERE id = $1
//     `;
//     db.query(queryString2, [itemID])
//     .then(data => {
//       res.redirect('/my_postings')
//     });
//   });
//   return router;
// };
