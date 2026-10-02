export default function checkAdmin(req,res,next){
let {role}=req.user
if(role!=="admin"){
   return  res.status(403).json({
        message:"You are not Authorized",
        success:false
    })
}

next()
}