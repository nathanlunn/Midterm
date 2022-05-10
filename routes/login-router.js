'user strict'
const express = require('express');
const router  = express.Router();
const getUserWithEmailAndPassword = require('../lib/helpers.js')

module.exports = (db) => {   
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        res.render("login",{error:''})
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/",(req,res)=>{
    const emailIn = req.body.email;
    const passwordIn = req.body.pw;
    //compare input wit db, and if existing redirect to "/", if not error
    getUserWithEmailAndPassword(emailIn,passwordIn,db)
    .then ((user)=>{
      console.log(user)
      if (user?.email === emailIn && user?.password === passwordIn) {
        res.redirect("/")
      } else {
        res.render('login',{error:'User Not Found'})
      }
    })
  })
  return router;
};








