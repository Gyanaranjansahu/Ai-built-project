import Router from 'express';
import checkAuth from '../middleware/authmiddleware.js';

const profileRouter = Router();

profileRouter.post("/update/:userId", updateProfile);
profileRouter.delete("/delete/:userId", deleteProfile);

export default profileRouter;