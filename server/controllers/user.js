const User    = require('../models/user');
const Lookout = require('../models/lookout')
const multer  = require('multer');
const path    = require('path');


const storage = multer.diskStorage({
    destination:'./upload/images/profile',
    filename:(req,file,cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage:storage}).single('profile-pic');


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

exports.getUser = (req,res) => {
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
            }else{
                return res.status(200).json({
                    message: "Profile has been sucessfully updated"
                })
            }
        }
    )

}


exports.updateUserProfilePic = (req,res) =>{
    const data  = req.profile
    
    upload(req,res,(err)=>{
        if(err){
            return res.status(400).json({
                error:"Cannot Update, Please Try again"
            })
        }
        else
            {
            data.profile = {
               path:`http://localhost:3000/api/profile/${req.file.filename}`  
            }
            data.save((err,savedData)=>{
            if(err){
                    return res.status(400).json({
                        error:"Cannot update, Please Try again"
                    })
                }else{
                   return res.status(200).json({
                        message: "Sucessfully Updated"
                    })    
                }
            })
        }
    })
    
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