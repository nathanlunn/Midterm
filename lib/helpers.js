<<<<<<< HEAD


const getUserWithEmailAndPassword =(emailIn,passwordIn,db) => {
  
  return result = db.query(`SELECT * FROM users WHERE email = $1 AND password = $2`,[emailIn,passwordIn]) 
=======
const getUserWithEmailAndPassword =(emailIn,passwordIn,db) => {
  
  return db.query(`SELECT * FROM users WHERE email = $1 AND password = $2`,[emailIn,passwordIn]) 
>>>>>>> feature/messages
  .then((data) =>{
    console.log(data.rows)
    return data.rows[0]
  })
  .catch((err) => {
    console.log("Error;-->" ,err.message);
    return false;
  });

};
<<<<<<< HEAD
//functions querying matchin items from db
const getItems = function(db,name,minprice,maxprice){
  return db.query(`SELECT * FROM items WHERE title LIKE $1 AND price >= $2 AND price <= $3`,[`%${name}%`,minprice * 100,maxprice * 100])
  .then((data)=>{
    items = data.rows
    console.log("items-->",items)
    return items
  })
}

module.exports = {getUserWithEmailAndPassword,
getItems};
=======

module.exports = getUserWithEmailAndPassword;
>>>>>>> feature/messages
