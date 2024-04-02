const express = require("express");
const router = express.Router();
const bcrypt  = require('bcrypt');
const User = require( "../models/User" );
const {getToken} = require("../utils/helpers");

router.post("/register", async (req, res)=>{
  
  try{
    const {email, password, firstName, lastName, username} = req.body;
    
    const user = await User.findOne({ email: email });
    if(user)
    {
      return res.status(403).json({error:true, message: 'Email already in use'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUserData = {email, password:hashedPassword, firstName, lastName, username};
    const newUser = await User.create(newUserData);
    if(!newUser)
    {
      return {error:true , message: "Error creating the account"} ;
    }
    const token = await getToken(email, newUser);
    const userToReturn = {...newUser.toJSON(), token, error:false};
    delete userToReturn.password;
    return res.status(200).json({
        token: userToReturn.token   
      });
    }catch(err){
        console.log(err);
        return  res.status(500).json({ error: true ,message:'Server Error'})
    }
});

router.post( "/login", async (req,res)=>{
  const {email, password}= req.body;

    const user = await User.findOne({email: email});
    
    if(!user)
    {
      return res.status(403).json({error:true, message: 'Email Not Exist'});
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if(!isPasswordValid)
    {
      return res.status(403).json({error:true, message: 'Invalid Credentials'});
    }
    
    const token = await getToken(user.email, user);
    console.log(token);
    const userToReturn = {...user.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json({
        token: userToReturn.token
      });

});


router.post('/logout', async (req, res) => {
    try {
      res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

module.exports = router;