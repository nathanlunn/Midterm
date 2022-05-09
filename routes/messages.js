const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    // REMOVE WHEN LOGIN IMPLEMENTED
    req.session.user_id = 3;

    const user_id = req.session.user_id;
    console.log(user_id);
    db.query(`SELECT messages.*, receiver.name AS receiver_name, sender.name AS sender_name, items.title AS item_title, items.photo_url AS item_image
    FROM messages 
    JOIN users receiver ON receiver_id = receiver.id 
    JOIN users sender ON sender_id = sender.id
    JOIN items ON item_id = items.id
    WHERE receiver_id = $1
    GROUP BY messages.id, receiver.id, sender.id, items.id;`, [user_id])
      .then(data => {
        const messages = data.rows;
        const templateVars = {messages, user_id};
        res.render('messages', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:item_id/:owner_id", (req, res) => {

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