const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  // for getting token to signup/login
const fetchUser = require('../middleware/fetchUser');


const JWT_SECRET = "Amanisagoodb$oy";

// Route 1: Create user using: POST method -> '/api/auth/createUser'. No login required
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),   // validating the name, email and password
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

  let success = false;
    // if there are error send bad request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 Bad request
      return res.status(400).json({success,  errors: errors.array() });
    }

  try{
    let user = await User.findOne({email: req.body.email});
    //if user with same email  already exists
    if(user){
      return res.status(400).json({success, error: "User with the same email already exists"});
    }
    
    // generating hash password
    const salt = await bcrypt.genSalt(10);  // generating salt to secure the hash password
    const securedPassword = await bcrypt.hash(req.body.password, salt);


    //Create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });
      
      const data = {
          user: {
            id: user.id
          }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken}); // es6

      //console.log(user);
      //res.json({"User": user})
    }
    catch(error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
});


// Route 2: Authenticate a user using: POST method -> '/api/auth/login'. No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be null').exists()
], async (req, res) => {
  
  let success = false;

  // if there are error send bad request with errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success, error: "Please login with correct crendentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password); // will return true or false
    if(!passwordCompare){
      return res.status(400).json({success, error: "Please login with correct crendentials"});
    }
    
    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authToken});

  } 
  catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }

});

// Route 3:Get loggedin user details using: POST '/api/auth/getUser'. Login required
router.post('/getUser', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); // exclude password
    res.send(user);
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;