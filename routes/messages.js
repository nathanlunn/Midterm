const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {

    // REMOVE WHEN LOGIN IMPLEMENTED
    req.session.user_id = 1;

    const user_id = req.session.user_id;
    db.query(`SELECT * FROM messages WHERE receiver_id = $1`, [user_id])
      .then(messages => {
        res.json(messages.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/messages/:item_id/:owner_id", (req, res) => {

    // REMOVE WHEN LOGIN IMPLEMENTED
    req.session.user_id = 1;

    const sender_id = req.session.user_id;
    const receiver_id = req.params.owner_id;
    const item_id = req.params.owner_id;
    const content = req.body.content;
    db.query(`INSERT INTO messages (sender_id, receiver_id, item_id, content) VALUES ($1, $2, $3, $4)`, [sender_id, receiver_id, item_id, content ])
      .then(() => {
        res.redirect('/messages');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};