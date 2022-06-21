const mongoose = require('mongoose');

const databaseConnection = async () => {
    try{    
        await mongoose.connect('mongodb://localhost:27017/ISMT-Assignment');
        console.log("Database connected successfully");

    }catch{
        console.error("Sorry could not connect with the database.")
    }
}
module.exports = databaseConnection;