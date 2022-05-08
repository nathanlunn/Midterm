const express = require('express');
const router  = express.Router();

router.get("/login", (req, res) => {
  res.send("This is login")
});

router.post("/login", (req, res) => {
  
});