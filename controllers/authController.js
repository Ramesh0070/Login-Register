const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const password = require('password');

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

// const verifyCaptcha = async (req, res) => {
//     //checking the captcha whether it is undefined, empty or null
//     if (req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null) {
//         return res.json({ 'success': false, 'msg': 'Please Select Captcha' })
//     }
//     //secret key
//     const secretKey = '6LcRaJUgAAAAAHmQAyhLwaQiEfOAZO5AtwrWLbhY'

//     const query = JSON.stringify({
//         secret: secretKey,
//         response: req.body.captcha,
//         remoteip: req.connection.remoteAddress
//     })

//     //verify URL
//     const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${query}`;

//     //make request to verify URL
//     const body = await fetch(verifyURL).then(res => res.json());

//     //if not successfull
//     if (body.success !== undefined && !body.success) {
//         return res.json({ 'success': false, 'msg': 'Failed Captcha Verification' });

//     }
//     return res.json({ 'success': true, 'msg': 'Captcha Verified' })
// }

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
        // verifyCaptcha();
        await user.save( );      
        res.send({user : user._id});
        // req.flash('success_msg', 'Successsfully Registered');
        // res.redirect('/login') 

    }catch(err){
        const {fullName, age,  phoneNumber, email, password} = req.body;
        const errors = handleErrors(err);
        console.log(errors)
        res.render('register', {errors, fullName, age,  phoneNumber, email, password});
    }   
}

const loginUser = async (req, res) =>{
    try{
        const email = req.body.email;
        const password = req.body.passowrd;
        //find user
        const findUser = await User.findOne({email : email})
        const passwordCompare = bcrypt.compare(password, findUser.password, (err, data) =>{
            if(err) throw err
            //if both matches then 
            if(data){
                return res.status(200).json({msg: "login Successfull"})
            }
            else{
                return res.status(401).json({msg: "Invalid Credentials "})
            }
        })       
    }catch(error){
        if(!findUser){
            errors.email = "Email did not match."
        }
        if(!passwordCompare){
            errors.password = "Password did not match."
        }
        
    }
}

const logoutUser = (req,res) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
}

module.exports = {
    returnSignupPage,
    returnLoginPage,
    createUser,
    loginUser,
    logoutUser
}