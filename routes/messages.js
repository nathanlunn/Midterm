'user strict'
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    const user_id = req.session.user_id;
    db.query(`SELECT messages.item_id, MAX(time_sent) AS time_sent, items.title AS item_title, items.photo_url AS item_image, items.is_sold AS is_sold, receiver.name AS receiver_name, receiver.id AS receiver_id, sender.name AS sender_name, sender.id AS sender_id
    FROM messages 
    JOIN users sender ON sender_id = sender.id
    JOIN users receiver ON receiver_id = receiver.id
    JOIN items ON item_id = items.id
    WHERE receiver_id = $1 OR sender_id = $1
    GROUP BY item_id, items.id, receiver.id, sender.id
    ORDER BY MAX(time_sent) desc;`, [user_id])
      .then(data => {
        const messagesUnfiltered = data.rows;
        for (let message of messagesUnfiltered) {
          let other_user = 'none';
          let other_user_id = 'none';
          const usersArray = [];
          const user1Id = message.receiver_id;
          const user1Name = message.receiver_name;
          const user1 = {id: user1Id, name: user1Name};
          const user2Id = message.sender_id;
          const user2Name = message.sender_name;
          const user2 = {id: user2Id, name: user2Name};
          usersArray.push(user1);
          usersArray.push(user2);
          for (let user of usersArray) {
            if (user.id !== user_id) {
              other_user = user.name;
              other_user_id = user.id;
            }
          }
          message.other_user = other_user;
          message.other_user_id = other_user_id;
        }

        const compare = function(array, compared) {
          for (let item of array) {
            if (item === compared) {
              return false;
            }
          }
          return true;
        }
        const messages = [];
        const already = [];
        for (let message of messagesUnfiltered) {
          if (compare(already, message.item_id)) {
            already.push(message.item_id);
            messages.push(message);
            console.log(already);
          }
        }

        const templateVars = {messages, user_id};
        res.render('messages', templateVars);
      })
      // .catch(err => {
      //   res
      //     .status(500)
      //     .json({ error: err.message });
      // });
  });

  router.get("/:item_id/:receiver_id/:sender_id", (req, res) => {
    
    const user_id = req.session.user_id;
    const item_id = req.params.item_id;
    const receiver_id = req.params.receiver_id;
    const sender_id = req.params.sender_id;

    db.query(`SELECT messages.*, items.photo_url AS item_image, items.price AS price, items.owner_id AS owner_id, items.title AS item_title, receiver.name AS receiver_name, sender.name AS sender_name
    FROM messages
    JOIN users receiver ON receiver_id = receiver.id 
    JOIN users sender ON sender_id = sender.id
    JOIN items ON item_id = items.id
    WHERE messages.item_id = $1 
    AND (messages.receiver_id = $2 OR messages.sender_id = $2)
    AND (messages.receiver_id = $3 OR messages.sender_id = $3)
    ORDER BY messages.time_sent desc`, [item_id, receiver_id, sender_id])
      .then(data => {
        const conversation = data.rows;

        
        // turn into helper function later
        // const other_user = helperFunction(messages);
        const usersArray = [];
        const user1Id = conversation[0].receiver_id;
        const user1Name = conversation[0].receiver_name;
        const user1 = {id: user1Id, name: user1Name};
        const user2Id = conversation[0].sender_id;
        const user2Name = conversation[0].sender_name;
        const user2 = {id: user2Id, name: user2Name};
        usersArray.push(user1);
        usersArray.push(user2);
        let other_user;
        let other_user_id;
        let owner_name;
        for (let user of usersArray) {
          if (user.id !== user_id) {
            other_user = user.name;
            other_user_id = user.id;
          }
        }
        for (let user of usersArray) {
          if (user.id === conversation[0].owner_id && user_id === user.id) {
            owner_name = 'You';
          } else if (user.id === conversation[0].owner_id && user_id !== user.id) {
            owner_name = user.name;
          }
        }


        const templateVars = {conversation, user_id, other_user, other_user_id, owner_name};
        res.render('conversation', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:item_id/:other_user_id", (req, res) => {

    const sender_id = req.session.user_id;
    const receiver_id = req.params.other_user_id;
    const item_id = req.params.item_id;
    const content = req.body.content;

    db.query(`INSERT INTO messages (sender_id, receiver_id, item_id, content) VALUES ($1, $2, $3, $4)`, [sender_id, receiver_id, item_id, content ])
      .then(() => {
        res.redirect(`/messages/${item_id}/${receiver_id}/${sender_id}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });
  
  router.post("/add", (req, res) => {

    const sender_id = req.session.user_id;
    const receiver_id = req.body.owner_id;
    const item_id = req.body.item_id;
    const content = req.body.content;
    console.log()

    db.query(`INSERT INTO messages (sender_id, receiver_id, item_id, content) VALUES ($1, $2, $3, $4)`, 
    [sender_id, receiver_id, item_id, content ])
      .then(data => {
        console.log(data);
        res.send('confirm');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};