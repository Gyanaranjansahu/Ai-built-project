import jwt from "jsonwebtoken";
import blacklist from "../schema/blacklistSchema.js";
import dotenv from "dotenv";
import { text } from "express";
dotenv.config();
async function checkAuth(req, res, next) {
  let usertoken = req.cookies.token;
  if (!usertoken) {
   return  res.status(401).json({
      text: "token not found",
    });
  }
try {
  let user = jwt.verify(usertoken, process.env.SECRET_KEY);
  if (!user) {
    return res.status(401).json({
      text: "invalid credential",
    });
  }
  
    let userdata = await blacklist.findOne({
   token:usertoken,
    });
    if (userdata) {
        return res.status(404).json({
           text:"token blacklisted" 
        })
    }
    req.user=user
    next();

  } catch (error) {
    return res.status(401).json({
text:error.message
    })
  }
}

export default checkAuth;