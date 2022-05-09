'user strict'
const express = require('express');
const router  = express.Router();
const existingUser = function (emaialIn,passwrodIn){


}

module.exports = (db) => {   
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        //const users = data.rows;
        //res.json({ users });
        res.render("login")
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/",(req,res)=>{
    const emaialIn = req.body.email;
    const passwrodIn = req.body.pw;
    //compare input wit db, and if existing redirect to "/", if not error
    db.query(``)
    
    

  })
  return router;
};








