const User = require('../models/User');
const bcrypt = require('bcrypt');
const e = require('connect-flash');


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

        const handleErrors = (err) => {

                if (!fullName  || age  || phoneNumber  || email || password){
                    err.push({msg: 'Please enter all fields.'})
                }

                if(password.length < 8 ){
                    err.push(({msg: 'Password must be at least of 8 characters. '}))
                }
                
                if(err.length > 0){
                    res.render('register',{
                        err,
                        fullName,
                        age,
                        phoneNumber,
                        email,
                        password
                    })
                }
                
                //duplicate errors 
                if(err.email === 11000){
                    err.email = "Email is already in use.."
                    return errors;
                }

                if(err.phoneNumber === 11000){
                    err.phoneNumber = "Phone Number is already in use.."
                    return errors;
                }

                //validation error
                if(err.message.includes('User validation failed')){
                    Object.values(err.errors).forEach(({properties}) => {
                        errors[properties.path] = properties.message
                })
            }
            
        }
        handleErrors();
        const user = new User({fullName, age, phoneNumber, email, password})
        //generating salt for the password 
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
        await user.save( );      
        res.send({user : user._id});
        req.flash('success_msg', 'Successsfully Registered');
        res.redirect('/login') 

    }catch(err){
        console.log(err)
        res.flash('err', 'error_msg')
        res.render('register', {err});
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