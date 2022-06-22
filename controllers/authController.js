const User = require('../models/User');
const bcrypt = require('bcrypt');


const returnHomePage = (req, res) =>{
    res.render('home');
}

const returnSignupPage = (req, res) => {
    res.render('register');
}

const returnLoginPage = (req, res) => {
    res.render('login');
}

const createUser = async (req, res) => {
    try{
        const {fullName, age,  phoneNumber, email, password} = req.body;
        const user = new User({fullName, age, phoneNumber, email, password})
        //generating salt for the password 
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
        await user.save( );      
        res.send({user : user._id}); 
    }catch(err){
        console.log(err)
        res.send({err})
    }   
}

const loginUser = (req, res) =>{
    //code
}

const logoutUser = (req,res) =>{
    //code
}

module.exports = {
    returnHomePage,
    returnSignupPage,
    returnLoginPage,
    createUser,
    loginUser,
    logoutUser
}