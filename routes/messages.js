const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    // REMOVE WHEN LOGIN IMPLEMENTED
    req.session.user_id = 1;

    const user_id = req.session.user_id;
    console.log(user_id);
    db.query(`SELECT messages.*, receiver.name AS receiver_name, sender.name AS sender_name, items.title AS item_title, items.photo_url AS item_image
    FROM messages 
    JOIN users receiver ON receiver_id = receiver.id 
    JOIN users sender ON sender_id = sender.id
    JOIN items ON item_id = items.id
    WHERE receiver_id = $1 OR sender_id = $1
    GROUP BY messages.id, receiver.id, sender.id, items.id
    ORDER BY messages.time_sent;`, [user_id])
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
    req.session.user_id = 3;

    const sender_id = req.session.user_id;
    const receiver_id = req.params.owner_id;
    const item_id = req.params.item_id;
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

  router.get("/:item_id/:receiver_id/:sender_id", (req, res) => {
    // REMOVE WHEN LOGIN IMPLEMENTED
    req.session.user_id = 3;
    
    const user_id = req.session.user_id;
    const item_id = req.params.item_id;
    const receiver_id = req.params.receiver_id;
    const sender_id = req.params.sender_id;

    db.query(`SELECT messages.*, items.photo_url AS item_image, items.title AS item_title, receiver.name AS receiver_name, sender.name AS sender_name
    FROM messages
    JOIN users receiver ON receiver_id = receiver.id 
    JOIN users sender ON sender_id = sender.id
    JOIN items ON item_id = items.id
    WHERE messages.item_id = $1 
    AND (messages.receiver_id = $2 OR messages.sender_id = $2)
    AND (messages.receiver_id = $3 OR messages.sender_id = $3)
    ORDER BY messages.time_sent`, [item_id, receiver_id, sender_id])
      .then(data => {
        const messages = data.rows;

        
        // turn into helper function later
        // const other_user = helperFunction(messages);
        const usersArray = [];
        const user1Id = messages[0].receiver_id;
        const user1Name = messages[0].receiver_name;
        const user1 = {id: user1Id, name: user1Name};
        const user2Id = messages[0].sender_id;
        const user2Name = messages[0].sender_name;
        const user2 = {id: user2Id, name: user2Name};
        usersArray.push(user1);
        usersArray.push(user2);
        let other_user;
        for (let user of usersArray) {
          if (user.id !== user_id) {
            other_user = user.name;
          }
        }


        const templateVars = {messages, user_id, other_user};
        res.render('conversation', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};