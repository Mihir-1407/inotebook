const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


//create a user using: POST "/api/auth/createuser" .No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3 }),
    body('email').isEmail(),
    body('password').isLength({min: 3 })
], async (req,res)=>{

  //if there are errors return status code 400 the error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }


    try {
    // Check whether a user with this email exists
    let user = await User.findOne({email: req.body.email})
    if (user){
      return res.status(400).json({errors: "Sorry a user with this email already exists"});

    }


    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })

    const data = {
      user:{
        id: user.id
      }
    }
    const JWT_SECRET = "Mihir";
    const authToken = jwt.sign(data,JWT_SECRET);
    res.json({authToken})

  }
    catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured")
    }
})

module.exports = router