const User = require('../models/User');
const bcrypt = require('bcrypt');
const e = require('connect-flash');
const passport = require('passport');

const handleErrors = (err) => {
    let errors = {fullName: '', age: '', phoneNumber: '', email : '', password: ''};
    console.log(err.message, err.code)
    console.log(err.message.includes('phoneNumber'))

    //duplicate error
    if(err.code === 11000){
        if(err.message.includes('phoneNumber')) {
            errors.phoneNumber = "Phone number already exists"
        }
        if(err.message.includes('email')) {
            errors.email = "Email already exists"
        }
        return errors
    }
    //validation error
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}



const returnHomePage = (req, res) =>{
    res.render('home');
}

const returnSignupPage = (req, res) => {
    const errors = {};
    res.render('register', {errors});
}

const returnLoginPage = (req, res) => {
    res.render('login');
}

const createUser = async (req, res) => {
    try{
        const {fullName, age,  phoneNumber, email, password} = req.body;
        const user = new User({fullName, age, phoneNumber, email, password})
        await user.save( );      
        res.send({user : user._id});
        // req.flash('success_msg', 'Successsfully Registered');
        // res.redirect('/login') 

    }catch(err){
        const {fullName, age,  phoneNumber, email, password} = req.body;
        const errors = handleErrors(err);
        console.log(errors)
        // res.flash('err', 'error_msg')
        res.render('register', {errors, fullName, age,  phoneNumber, email, password});
    }   
}

const loginUser = (req, res) =>{
    try{
        const {email, password} = req.body;
        //match email
        User.findOne({email: email}).then( user => {
            if(!email) {
                return (null, false, {message : 'Email Does not match'});
            }

            //match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(er) throw err;
                if(isMatch){
                    res.render('dashboard')
                    // return done(null, user);
                }
                else{
                    return(null, false, {message: 'Password Incorrect'});
                }
            })
        })
        passport.authenticate('local', {
            successRedirect : 'dashboard',
            failureRedirect: 'login',
            failureFlash : true
        })
    }catch(err){
        console.log(err)
    }
}

const logoutUser = (req,res) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
}

module.exports = {
    returnHomePage,
    returnSignupPage,
    returnLoginPage,
    createUser,
    loginUser,
    logoutUser
}