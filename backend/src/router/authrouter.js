import { Router } from "express";
import add from "../controller/signupcontroll.js";
import upload from "../middleware/profileupload.js";
const signup=Router()
try {
    signup.post("/register", upload.single("profileImage"), add)
} catch (error) {
    console.log(error.message);
    
}
export default signup