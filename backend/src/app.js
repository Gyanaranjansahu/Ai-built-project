import express from "express"
import signup from "./router/authrouter.js"
import cors from "cors"
// import connectDB from "./config/database.js";
import Login from "./router/loginroute.js";
import cookieParser from "cookie-parser"
import LogoutRoute from "./router/logoutroute.js";
import userRoute from "./router/userroute.js";
import interviewRouter from "./router/interview.js";
import dotenv from "dotenv/config"
// dotenv.config()
// connectDB()

let app=express()

app.use(cors(
  {
    origin:[
      process.env.FRONT_END
      ,
      
      "http://localhost:5173"],
     credentials: true
  }
))


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(cookieParser())
try{
    // signup or register
    app.use("/api/auth",signup)
    // login
    app.use("/api/auth",Login)
    // logout user
    app.use("/api/auth",LogoutRoute)
    // get user details
  app.use("/api/auth",userRoute)

  // Interview generate API has its own clear route: POST /api/interview
  app.use("/api/interview",interviewRouter)
  // This keeps an auth-prefixed route also available: POST /api/auth/interview
  app.use("/api/auth/interview",interviewRouter)
}
catch(error){
    console.log(error.message);
    
}
export default app
