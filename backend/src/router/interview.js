import express from "express"
import checkAuth from "../middleware/authmiddleware.js"
import GenerateInterview from "../controller/interviewcontroller.js"
import upload from "../middleware/file.middleware.js"
const interviewRouter=express.Router()

// This wrapper catches multer upload errors and returns JSON instead of breaking the request.
function uploadResume(req,res,next){
    upload.single("resume")(req,res,(error)=>{
        if(error){
            return res.status(400).json({
                message:error.message || "resume upload failed"
            })
        }
        next()
    })
}

// Use the controller here because it handles file parsing, AI generation, and database saving.
interviewRouter.post("/generate",checkAuth,uploadResume,GenerateInterview)
export default interviewRouter
