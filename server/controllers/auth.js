const User       = require('../models/user');
const jwt        = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();
const { 
    registerValidation, 
    loginValidation,
} = require('./validation');


exports.register  = async (req,res)=> {
    const {error} = registerValidation(req.body);
        if (error){
            return res.status(400).json({
                error:error.details[0].message
            }); 
        }     
    
        const userExist = await User.findOne({email:req.body.email});
        if (userExist){
            return res.status(400).json({
                error: 'User already exists'
             }); 
        }  

    const user = new User(req.body) 
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"User not saved"
            })
        }else{
            res.send(user);
        } 
       
    })
}

exports.login =  async (req,res)=> {
    const {error} = loginValidation(req.body);
    if (error){
        return res.status(400).json({
            error:error.details[0].message
        })
    } 
    
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({
          error:"User not found" 
        });
    } 
    if(!user. authenticate(req.body.password)){
        return res.status(401).json({
            error:"Email and Password do not match"
        })
    }
    const token = jwt.sign({ _id: user._id },process.env.TOKEN_SECRET);
    const {_id,name,email} = user;
    return res.json({token,user:{_id,name,email,}});  
}


exports.isSignedIn = expressJwt({
    secret: process.env.TOKEN_SECRET,
    userProperty: "auth"
});

exports.isAuthenticated = (req,res,next)=> {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next();
}  

