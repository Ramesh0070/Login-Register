const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  fullName: {
    type : String,
    required : [true, "Fullname is required"],
    maxlength : [20, "Fullname must be less than 20 characters"],
    minlenth : [5, "Fullname must be more than 5 characters"],
    trim: true
  }, 
  age : {
    type : Number,
    required : [true, "Age is required"]
  }, 
  phoneNumber : {
    type : Number,
    required : [true, "Phone number is required"],
    unique : true,
    minlength: [10, "Phone number must be 10 characters long"]
  },
  email : {
    type : String,
    required : [true, "Email is required"],
    unique : true,
    validate : [validator.isEmail, "Email is not valid"]
  },
  password : {
    type : String,
    required : [true, "Password is required"],
    minlength : [6, "Password must be at least 6 characters long"]
  }
})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

const User = new mongoose.model('User', userSchema);

module.exports = User;