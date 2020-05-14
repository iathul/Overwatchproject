const User    = require('../models/user');
const Lookout = require('../models/lookout')


exports.getUserById = (req,res,next,id)=>{
    User.findById(id,(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"No user found"
            })
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req,res)=>{
    req.profile.salt       = undefined;
    req.profile.hashedPswd = undefined;
    return res.json(req.profile);
}


exports.updateUser = (req,res)=> {
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true, useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update this user"
                })
            }
           res.json(user);
        }
    )
}

exports.userLookOutData = (req, res) => {
    Lookout.find({ user: req.profile._id })
      .populate("user", "_id name ")
      .exec((err, lookoutData) => {
        if (err) {
          return res.status(400).json({
            error: "No Order in this account"
          });
        }
        return res.json(lookoutData);
    });
}