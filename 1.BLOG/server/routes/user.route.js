import { Router } from 'express';
import {getUserByProfile, updateProfile} from "../controllers/user.controller.js";
import {protectRoute} from "../middleware/auth.js";

const userRoute = Router();

//http://localhost:3000/api/v1/user/:username/get-user
userRoute.get('/:username/get-user', protectRoute ,getUserByProfile);
//http://localhost:3000/api/v1/user/update-profile
userRoute.put('/update-profile', protectRoute ,updateProfile);


export default userRoute;