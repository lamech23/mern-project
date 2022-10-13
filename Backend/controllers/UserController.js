const User = require('../models/UserModel')
const jwt =require('jsonwebtoken')

const createToken = (_id) =>{
  return  jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})

}

//login user
const loginUser = async (req , res)=>{
const{email ,password}=req.body

try{
    // logging in the user 
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.status(200).json({email , token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}






//signup user
const signupUser = async (req,res)=>{
    const {email , password }=req.body
    try{
    // logging in the user 
        const user = await User.signup(email,password)
        //after saving to the db create a token
        const token = createToken(user._id)
// pass the token as a response instead of the user
        res.status(200).json({email , token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
module.exports={loginUser,signupUser}