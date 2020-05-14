const Lookout = require('../models/lookout');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs'); 

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
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
        if(err){
            return res.status(400).json({
                error:"Cannot Upload Try again"
            })
        }
        else{
            
            const newData = new Lookout({
                name        :req.body.name,
                crimeNumber :req.body.crimeNumber,
                user        :req.profile,
                images:
                {
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

            })
            newData.save((err,savedData)=>{
                if(err){
                    res.send(err)
                }else{
                    res.status(200).json({
                        message:"Successfully Uploaded"
                    })
                }
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
        /*searchResult = [];
        for(i=0;i<data.length;i++){
            imageData = {
                name : data[i].name,
                front: data[i].images.front.path,
                right: data[i].images.right.path,
                left : data[i].images.left.path
            }
            searchResult.push(imageData);
        }
        res.status(200).send(searchResult)*/
    })
}

exports.deleteLookOutData = (req,res) =>{
    let data = req.lookOutData;
    data.remove((err, deletedData)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete the product"
            })
        }
        res.json({ message:"Successfully deleted" })
        
        
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
            data.name   = req.body.name
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




