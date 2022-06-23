const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')
const databaseConnection = require('./dbConnection/connection')
const session = require('express-session');
const flash = require('connect-flash');
const app = express();


//Session and Flash view
app.use(session({
  secret: 'ilikecats',
  cookie: {},
  resave: false,
  saveUninitialized: true
}));
app.use(flash());


//Middleware 
app.use(express.urlencoded({extended : false})) // urlencoded - object
app.use(express.json());

// database connection
databaseConnection();

//view engine
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//routes
app.get('/', (req, res) => res.render('home'));
app.use(authRoutes)


app.listen(5000,() =>{
  console.log("Server is running at port 5000.")
})