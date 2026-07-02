import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"userName already exist"],
        require:true
    },
    email:{
        type:String,
        unique:[true,"the mail already exist"],
        require:true
    },
    password:{
        type:String,
        require :true
    }
})
let connect=mongoose.model("user",userSchema)
export default connect