const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../fetchuser')


const User = require('../models/User');
const JWT_SECRET='iamkushagra$kumar';
const { body, validationResult } = require('express-validator');
const router = express.Router();
//these are for valid name,email and password

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
// Route 1 create user 
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 })


],async(req,res)=>{
    let success =false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });}//below are for already exixts email
      try{
        let user=await User.findOne({ email: req.body.email });
        if(user){
            return res.status(400).json({ success,error : "Sorry a user with email already exixts"})
        }
        const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);//added saly and bcrypt to the database to hide the password
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass 
      })
      const data={
        id:user.id
      } 
      const authtoken = jwt.sign(data,JWT_SECRET);
      //console.log(jwtData)
      success=true;
      res.json({success,authtoken})
      console.log(authtoken);
      localStorage.setItem("auth-token",authtoken);
     
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});


//Route 2 below code is for authication check and login just same as upper one 

router.post('/login',[
   
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 })


],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });}
    
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ error : "Please try to login with correct credentials "});
        }

        const passwordCompare =await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({ success,error : "Please try to login with correct credentials"});
        }
        const data={
            user:{
            id: user.id
            }
        }

        const authtoken = jwt.sign(data,JWT_SECRET);
        //console.log(jwtData)
        success=true;
        res.json({success,authtoken})
        console.log(authtoken)
       
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});


// route 3 below code is for get user data

router.post('/getuser',fetchuser,async(req,res)=>{
    try{
        userId= req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error")


    }
})



module.exports = router