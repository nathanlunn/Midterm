const express = require('express');
const router  = express.Router();

router.get("/register", (req, res) => {
  res.send("This is register")
});

router.post("/register", (req, res) => {
  
});

