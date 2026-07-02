import mongoose from "mongoose";
const blacklistSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    }
},
  {
        timestamps:true
    }

)
let blacklist=mongoose.model("blacklist",blacklistSchema)
export default blacklist