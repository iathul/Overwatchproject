const mongoose   = require('mongoose');
const { ObjectId } = mongoose.Schema;

const lookOutSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    crimeNumber:{
        type:Number
    },
    user:{
        type:ObjectId,
        ref:"User",
    },
    images:
    {
        front:{
            originalname:String,
            filename:String,
            path:String
        },
        right:{   
            originalname:String,
            filename:String,
            path:String
        },
        left:{
            originalname:String,
            filename:String,
            path:String
        }
    }
    
})


module.exports = mongoose.model('Lookout',lookOutSchema); 