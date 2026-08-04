import Router from 'express';
import checkAuth from '../middleware/authmiddleware.js';
import updateProfile from '../controller/profileupdate.js';
import deleteProfile from '../controller/profiledelete.js';
import upload from "../middleware/profileupload.js";

const profileRouter = Router();

profileRouter.put("/update",upload.single('profileImage'), checkAuth, updateProfile);
profileRouter.delete("/delete", checkAuth, deleteProfile);

export default profileRouter;