const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  // for getting token to login


const JWT_SECRET = "Amanisagoodb$oy";

//Create user using: POST method -> '/api/auth/createUser'. It doesn't require auth
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),   // validating the name, email and password
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    // if there are error send bad request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  try{
    let user = await User.findOne({email: req.body.email});
    //if user with same email  already exists
    if(user){
      return res.status(400).json("User with the same email already exists");
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
      res.json({authToken}); // es6

      //console.log(user);
      //res.json({"User": user})
    }
    catch(error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
});

module.exports = router;