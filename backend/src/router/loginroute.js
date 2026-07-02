import express from "express"
import verify from "../controller/logincontroll.js"

let Login=express.Router()
try{
    Login.post("/login",verify)
}
catch(error){

}
export default Login