import express from "express"

import usercontroller from "../controller/usercontroller.js"
import checkAuth from "../middleware/authmiddleware.js";
const userRoute=express.Router()
try {
    userRoute.get("/user",checkAuth,usercontroller)
}
catch(error){
    console.log(error.message);
}
export default userRoute