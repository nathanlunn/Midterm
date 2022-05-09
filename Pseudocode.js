//set up route for main page GET /
//set up reoute for items page GET /items
//set up route for favouries GET /favourites

const req = require("express/lib/request")
const { append } = require("express/lib/response")

//run script to favourites table


//main page GET
  list items, create header/navigation bar with css on the HTML page


  //users -- don't bother with registration, just create a users database
  app.get ('/login/:id', (req, res) => {
    //set the cookie
    req.session.user_id = req.params.id;

    // or use plaintext cookies
    res.cookie('user_id', req.params.id);

    //send the user somewhere
    res.redirect('/')
  });

  make a get request to locahost:3000/login/5


//create each page as its own router
// export it
// require it in the main router file -- server.js?

//     ITEM PAGE
//query to return items

 const allItemsOnHomePage = function () {
   const queryString = `
   SELECT *
   FROM items
   `;
 }

 return pool
 .query (queryString, [])
 .then ((response => {
   return response.rows;
 }))
 .catch ((err) => {
   console.log(err.message);
 });

 exports.allItemsOnHomePage = allItemsOnHomePage;
