import blacklist from "../schema/blacklistSchema.js";
const Logout=async(req,res)=>{
    let token=req.cookies.token
    if(!token){
        return res.status(404).json({
            text:"token not found"
        })
    }
    try {
        let add= await blacklist.insertOne({
            token:token
        })
        res.clearCookie("token")
        return res.status(200).json({
            text:"Logout successful"
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
           text:"internal server error" 
        })
    }
}
export default Logout