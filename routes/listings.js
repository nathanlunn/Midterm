'user strict'
const express = require('express');
const router  = express.Router();

module.exports = (db) => {   
  router.get("/new", (req, res) => {
    res.render("new");
  })
  router.post("/new",(req,res)=>{
    const user_id = req.session.user_id;
    console.log(req.body)
    const {title, description, price, photo} = req.body
    db.query(`INSERT INTO items (owner_id, title, description, price, photo_url) VALUES ($1,$2,$3,$4,$5)`,[user_id, title, description, price * 100, photo])
    .then(()=>{
      res.redirect("/my_postings");
    })
  })
  return router;
};
