import { Router } from "express";
import checkAuth from "../middleware/authmiddleware.js";
import checkAdmin from "../middleware/RoleAuthMiddleware.js";
import getAdmin from "../controller/adminData.js";
import getAllUser from "../controller/AllUser.js";
const AdminAccess=Router()



AdminAccess.get("/active_user",checkAuth,checkAdmin,getAllUser)

export default AdminAccess