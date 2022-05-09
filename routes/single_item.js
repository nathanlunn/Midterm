const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:item_id", (req, res) => {

    // REMOVE WHEN LOGIN IMPLEMENTED
    req.session.user_id = 3;

    const item_id = req.params.item_id;
    const user_id = req.session.user_id;
    
    db.query(`SELECT items.*, users.name, users.email, users.phone FROM items JOIN users ON owner_id = users.id WHERE items.id = $1;`, [item_id])
      .then(data => {
        console.log(data);
        const itemAndOwner = data.rows[0];
        const templateVars = { itemAndOwner };
        // *** can be implemented when cookie and  implemented ***
        if (user_id === itemAndOwner.owner_id) {
          console.log('test');
          return res.redirect('/owned_items');
        }
        return res.render('single_item', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

