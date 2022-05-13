// load .env data into process.env
require("dotenv").config();
 
// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ["thisisalongsecretkeyithink"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// cookies session to grab user_id from cookie

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const listingsRoutes = require('./routes/listings');
const login = require('./routes/login-router');
const filter = require('./routes/filter')
const single_itemRoutes = require('./routes/single_item');
const messagesRoutes = require('./routes/messages');
const favouritesRoutes = require('./routes/favourites');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: mount other resources here, using the same pattern above
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use('/login',login(db));
app.use('/listings',listingsRoutes(db));
app.use('/filter',filter(db));
app.use("/messages", messagesRoutes(db));
app.use('/favourites', favouritesRoutes(db));
app.use("/single", single_itemRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.post('/logout', (req, res) => {
  delete req.session.user_id;
  res.redirect('/login');
});

app.get("/", (req, res) => {
  res.render("index");
}); 

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
