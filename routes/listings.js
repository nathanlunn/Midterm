'user strict'
const express = require('express');
const router  = express.Router();

module.exports = (db) => {   
  router.get("/new", (req, res) => {
    res.render("new");
  })
  router.post("/new",(req,res)=>{
    console.log(req.body)
    const {title, description, price, photo} = req.body
    db.query(`INSERT INTO items (title, description, price, photo_url) VALUES ($1,$2,$3,$4)`,[title, description, price, photo])
    .then(()=>{
      res.redirect("/listings")
    })
  })
  return router;
};
