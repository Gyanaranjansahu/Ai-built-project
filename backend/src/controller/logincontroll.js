import connect from "../schema/model.js";
import jwt from "jsonwebtoken"
import cookie from "cookies"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
dotenv.config()
  const verify=async(req,res)=>{
    let {email,password}=req.body
    console.log(req.body)
    if(!email || !password){
        return res.status(400).json({
            text:"all fields are required here"
        })
    }
    let exist=await connect.findOne({
        email:email})
    if(!exist){
        return res.status(401).json({
            text:"user not exist"
        })
    }
   try{

 let verify=await bcrypt.compare(password,exist.password)
    if(!verify){
        return res.status(401).json({
           text:"invalid password" 
        })
    }

    let token =jwt.sign({id:exist._id},process.env.SECRET_KEY)
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        maxAge:7*24*60*60*1000,
        sameSite: "none"
    })

    return res.status(200).json({
        text:"login successful",
        token:token,
        user:{
            id:exist._id,
            name:exist.name,
            email:exist.email,
            token:token,
        }
    })

   }
   catch(error){
console.log(error);
res.status(500).json({
    text:"internal server error"
})
   }
}
export default verify