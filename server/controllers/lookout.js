const Lookout = require('../models/lookout');
const multer  = require('multer');
const path    = require('path');
const fs = require("fs")

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload  = multer({storage:storage}).array('image');


exports.getLookOutDataById = (req,res,next,id)=>{
    Lookout.findById(id,(err,lookOutData)=>{
        if(err || !lookOutData){
            return res.status(400).json({
                error:'No Data found'
            })
        }
        req.lookOutData = lookOutData;
        next()
    })
}


exports.createLookOutData = (req,res)=>{
   upload(req,res,(err)=>{
        if(err){    return res.status(400).json({   error:"Cannot Upload Try again" })
        }
        else{   const newData = new Lookout({
                name        :req.body.name,
                crimeNumber :req.body.crimeNumber,
                user        :req.profile,
                images:
                {
                    front:{ originalname:req.files[0].originalname,
                            filename:req.files[0].filename,
                            path:`http://localhost:3000/api/images/${req.files[0].filename}`  
                    },
                    right:{ originalname:req.files[1].originalname,
                            filename:req.files[1].filename,
                            path:`http://localhost:3000/api/images/${req.files[1].filename}`
                    },
                    left:{  originalname:req.files[2].originalname,
                            filename:req.files[2].filename,
                            path:`http://localhost:3000/api/images/${req.files[2].filename}`
                    }
                }})
            newData.save((err,savedData)=>{
                if(err){
                    res.status(400).json({  error:"Cannot Add Details Please Try Again" })
                }else{
                    res.status(200).json({
                        culpritId:savedData._id,
                        message:"Successfully Uploaded"
                    })}
                })
            }
    })
}

exports.getLookOutData = (req,res)=>{
    return res.json(req.lookOutData);
}


exports.getAllLookoutData = (req,res)=>{
    Lookout.find().exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:"No Data found"
            })
        }
        res.json(data);
        
    })
}

exports.findbyCrimeNumber = (req,res) =>{
    Lookout.findOne({crimeNumber:req.body.crimeNumber},(err,data)=>{
        if(err || !data){
            return res.status(400).json({
                error:'No Data found'
            })
        }else{
            return res.status(200).json(data);
        }
    })
}

exports.deleteLookOutData = (req,res) =>{
    let data = req.lookOutData;
    data.remove((err, deletedData)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete"
            })
        }
        
        res.json({ message:"Successfully deleted" })
        let front = deletedData.images.front.filename
        let right = deletedData.images.right.filename
        let left  = deletedData.images.left.filename
        fs.unlink(`./upload/images/${front}`,(err)=>{
            if(err){
                console.log(err)
            }
        })
        fs.unlink(`./upload/images/${right}`,(err)=>{
            if(err){
                console.log(err)
            }
        })
        fs.unlink(`./upload/images/${left}`,(err)=>{
            if(err){
                console.log(err)
            }
        })
        
        
    })
}
  
exports.updateLookOutData = (req,res) =>{
    const data  = req.lookOutData
    
    upload(req,res,(err)=>{
        if(err){
            return res.status(400).json({
                error:"Cannot Upload Try again"
            })
        }
        else{
            data.name        = req.body.name,
            data.crimeNumber = req.body.crimeNumber,
            data.user        = req.profile,

            data.images = {
                front:{
                    originalname:req.files[0].originalname,
                    filename:req.files[0].filename,
                    path:`http://localhost:3000/api/images/${req.files[0].filename}`  
                },
                right:{
                    originalname:req.files[1].originalname,
                    filename:req.files[1].filename,
                    path:`http://localhost:3000/api/images/${req.files[1].filename}`
                },
                left:{
                    originalname:req.files[2].originalname,
                    filename:req.files[2].filename,
                    path:`http://localhost:3000/api/images/${req.files[2].filename}`
                    }
            }

    
        data.save((err,savedData)=>{
            if(err){
                    res.send(err)
                }else{
                    res.status(200).json({
                        message:"Successfully Updated"
                    })
                }
            })
        }
    })
    
}

// exports.test = (req,res)=>{
//     let data = req.body
//     res.status(200).json(data)
// }
