const express = require('express');
const router  = express.Router();

module.exports = (db) => {
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
              return res.redirect('/owned_items');
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

