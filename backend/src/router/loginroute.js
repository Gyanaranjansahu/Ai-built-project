import express from "express"
import UserLogin from "../controller/logincontroll.js"
let Login=express.Router()
try{
    Login.post("/login" , UserLogin )
}
catch(error){

}
export default Login