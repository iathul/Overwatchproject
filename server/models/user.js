const mongoose       = require('mongoose');
const crypto         = require('crypto')
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    hashedPswd:{
        type:String,
        required:true,
        min:8,
        max:1024
    },
    salt:String,
    
})

userSchema.virtual("password")
    .set(function(password){
        this._password   = password;
        this.salt        = uuidv4()
        this.hashedPswd  = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword)===this.hashedPswd
    },
    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto
            .createHmac("sha256",this.salt)
            .update(plainpassword)
            .digest('hex');
        }catch(err){
            return "";
        }
    }
}    



module.exports = mongoose.model('User',userSchema); 