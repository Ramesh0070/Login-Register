const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
  fullName: {
    type : String,
    required : true,
    maxlength : 20,
    minlenth : 5,
    trim: true
  }, 
  age : {
    type : Number,
    required : true
  }, 
  gender : {
    type : String,
    required : true
  },
  phoneNumber : {
    type : Number,
    required : true,
    unique : true,
    minlength: 10
  },
  email : {
    type : String,
    required : true,
    unique : true,
    validate : validator.isEmail
  },
  password : {
    type : String,
    required : true,
    minlength : 6
  }
})

const User = new mongoose.model('User', userSchema);

module.exports = User;