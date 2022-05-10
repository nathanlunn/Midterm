

const getUserWithEmailAndPassword =(emailIn,passwordIn,db) => {
  
  return result = db.query(`SELECT * FROM users WHERE email = $1 AND password = $2`,[emailIn,passwordIn]) 
  .then((data) =>{
    console.log(data.rows)
    return data.rows[0]
  })
  .catch((err) => {
    console.log("Error;-->" ,err.message);
    return false;
  });

};

module.exports = getUserWithEmailAndPassword;