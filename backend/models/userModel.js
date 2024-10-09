const mongoose = require('mongoose') 
const validator = require('validator');
const bcrypt =  require('bcrypt');
const userSchema = new mongoose.Schema({
     name : {
        type : String ,
        required : [true , "Name is Required"],
        maxLength : [40 , "Name cannot be exceed 40 Characters"] ,
     },
     email : {
        type : String ,
        required : [true , "Email is Required"],
        unique : true ,
        validate : {
        validator : function(value){
            return validator.isEmail(value)
        },
        message : "Please Enter a Valid Email"
       }
     },
     phone : {
        type : String,
        unique : true
     },
     password : {
        type : String, 
        validate : {
            validator : function (value){
                if(this.googleId) return true ;
                return validator.isStrongPassword(value,{
                    minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
                })
            },
            message : "Password must contain 1 uppercase , 1 lowercase , 1 Symbol ,1 Number"
        }
     },
     role : {
        type : String ,
       enum : ['admin' , 'user'] ,
       default : 'user' 
     } ,

     googleId : {
        type : String ,
        unqiue : true ,
        sparse : true //null when the google id is not available when we signup the user
     }
})

userSchema.pre('save', async function(next){
    console.log('doc save')
    if(!this.isModified('password') )
    {
  return next()
    }
    
    this.password = await bcrypt.hash(this.password , 12)
   
    next()
})


const User = mongoose.model("User", userSchema) ;

module.exports = User ;