const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require ('validator')
// bcrypt is for hashing password

const Schema = mongoose.Schema
const userSchema =new Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    }
})
  
// static sigup method
userSchema.statics.signup =async function(email, password){
// validation
if(!email  || !password){
    throw Error ('All field must be field')
}
if(!validator.isEmail(email)){
    throw Error('Invalid Email')
}

if(!validator.isStrongPassword(password)){
    throw Error('Weak password')
}

    const exists = await this.findOne({email})

    if(exists){
        // the reason why throw is being used is because we dont have acces to the json
        throw Error('Email already exists')
    }
    // the use of salt 
    //the number in the genSalt is the number of rounds or the cost of salts
    const salt =await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email ,password:hash})

    
    return user

}
// static login method
userSchema.statics.login = async function(email ,password){
    if(!email || !password){
        throw Error('All fields must be fileld')
    }
    const user = await this.findOne({ email })

    if(!user){
        // the reason why throw is being used is because we dont have acces to the json
        throw Error('Invalid email')
    }
    // trying to compare the password N/B :user.password is the hased password
    const match = await bcrypt.compare(password , user.password)
    if(!match){
        throw Error ('invalid password')
    }
    return user
}
 
module.exports = mongoose.model('User',userSchema)