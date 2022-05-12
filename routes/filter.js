'user strict'
const express = require('express');
const router  = express.Router();
const {getItems} = require('../lib/helpers.js')

module.exports = (db) => {   
  router.get("/", (req, res) => {
    res.render("filter");
  })
  router.post("/", (req, res) => {
    const {name, minprice, maxprice}= req.body
    getItems(db,name,minprice,maxprice)
    .then(()=>{
       res.json(items)
    })
  })
  return router;
};
