import express from "express";
import Logout from "../controller/logout.js";
let LogoutRoute = express.Router();
  LogoutRoute.get("/logout", Logout);

export default LogoutRoute;
