const express = require('express');
const router  = express.Router();

router.get("/new", (req, res) => {
  res.send("This is to create items for sale")
})




router.post("/new", (req, res) => {
  
})
