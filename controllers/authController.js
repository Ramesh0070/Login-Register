const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const password = require("password");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = {
    fullName: "",
    age: "",
    phoneNumber: "",
    email: "",
    password: "",
  };
  console.log(err.message, err.code);
  console.log(err.message.includes("phoneNumber"));

  //duplicate error
  if (err.code === 11000) {
    if (err.message.includes("phoneNumber")) {
      errors.phoneNumber = "Phone number already exists";
    }
    if (err.message.includes("email")) {
      errors.email = "Email already exists";
    }
    return errors;
  }
  //validation error
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const verifyCaptcha = async (req, res) => {
  try {
    //checking the captcha whether it is undefined, empty or null
    if (
      req.body.captcha === undefined ||
      req.body.captcha === "" ||
      req.body.captcha === null
    ) {
      return res.json({ success: false, msg: "Please Select Captcha" });
    }
    //secret key
    const secretKey = "6LcRaJUgAAAAAHmQAyhLwaQiEfOAZO5AtwrWLbhY";

    const query = JSON.stringify({
      secret: secretKey,
      response: req.body.captcha,
      remoteip: req.connection.remoteAddress,
    });

    //verify URL
    const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${query}`;

    //make request to verify URL
    const body = await fetch(verifyURL).then((res) => res.json());

    //if not successfull
    if (body.success !== undefined && !body.success) {
      return res.json({ success: false, msg: "Failed Captcha Verification" });
    }
    return res.json({ success: true, msg: "Captcha Verified" });
  } catch (err) {
    console.log(err);
  }
};

const returnSignupPage = (req, res) => {
  const errors = {};
  res.render("register", { errors });
};

const returnLoginPage = (req, res) => {
  const errors = {};
  res.render("login", { errors });
};

const createUser = async (req, res) => {
  try {
    const { fullName, age, phoneNumber, email, password } = req.body;
    const user = new User({ fullName, age, phoneNumber, email, password });
    verifyCaptcha();
    await user.save();
    //Token create
    const token = jwt.sign({ id: user._id }, "mern-secret", {
      expiresIn: 24 * 60 * 60,
    });
    // res.setHeader('Set-Cookie', `jwt=${token}`)
    res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000 });
    res.send({ user: user._id });
    // req.flash('success_msg', 'Successsfully Registered');
    // res.redirect('/login')
  } catch (err) {
    const { fullName, age, phoneNumber, email, password } = req.body;
    const errors = handleErrors(err);
    console.log(errors);
    res.json({errors})
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    //find user
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      bcrypt.compare(password, findUser.password, (err, data) => {
        if (err) throw err;
        //if both matches then
        if (data) {
          //Token create
          const token = jwt.sign({ id: findUser._id }, "mern-secret", {
            expiresIn: 24 * 60 * 60,
          });
          // res.setHeader('Set-Cookie', `jwt=${token}`)
          res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000 });
          return res.status(200).json({ msg: "Login Successful" });
        } else {
          return res.status(401).json({ msg: "Invalid Credentials " });
        }

        //match password
        // bcrypt.compare(password, user.password, (err, isMatch) => {
        //     if(er) throw err;
        //     if(isMatch){
        //         res.render('dashboard')
        //         // return done(null, user);
        //     }
        //     else{
        //         return(null, false, {message: 'Password Incorrect'});
        //     }
        // })
      });
    }
    passport.authenticate("local", {
      successRedirect: "dashboard",
      failureRedirect: "login",
      failureFlash: true,
    });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.json({errors})
    // if (!findUser) {
    //   errors.email = "Email did not match.";
    // }
    // if (!passwordCompare) {
    //   errors.password = "Password did not match.";
    // }
  }
};

const logoutUser = (req, res) => {
    res.cookie('jwt', '', {maxAge : 1});
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
};

module.exports = {
  returnSignupPage,
  returnLoginPage,
  createUser,
  loginUser,
  logoutUser,
};
