
import connect from "../schema/model.js";
import bcrypt from "bcrypt"
export default async function add(req,res){
    let {name,email,password}=req.body

    if(!name || !email || !password){
    return   res.status(400).json({
        text:"all fields are required"
      })  
    }
    // if the user exist inside database return exist!!
    let exist=await connect.findOne({
        $or:[
            {name:name},
            {email:email}
        ]
    })


    if(exist){

      return   res.status(401).json({
            text:"user exist ",
            name,
            email
        })
    }
    // hasing password and stored in a random generated string
    let hashpass=await bcrypt.hash(password,10)


/**create  a user inside database */
   try {
     let create=await connect.create({
        name:name,
        email:email,
        password:hashpass
    })
   return  res.status(201).json({
        text:"Signup successfully",
        user:{
            name,
            email,
            password
        }

    })
    
   } catch (error) {
    console.log(error.message);
  return   res.status(500).json({
        text:"internal server error"
    })
    
   }
}