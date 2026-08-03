import Router from 'express';
import checkAuth from '../middleware/authmiddleware.js';
import updateProfile from '../controller/profileupdate.js';
import deleteProfile from '../controller/profiledelete.js';

const profileRouter = Router();

profileRouter.post("/update/:userId", updateProfile);
profileRouter.delete("/delete/:userId", deleteProfile);

export default profileRouter;