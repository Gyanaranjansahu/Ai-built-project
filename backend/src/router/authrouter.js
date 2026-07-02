import { Router } from "express";
import add from "../controller/signupcontroll.js";
const signup=Router()
try {
    signup.post("/register",add)
} catch (error) {
    console.log(error.message);
    
}
export default signup