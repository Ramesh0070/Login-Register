const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')
const databaseConnection = require('./dbConnection/connection')
const app = express();

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