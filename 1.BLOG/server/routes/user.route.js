import { Router } from 'express';
import { getUserByProfile} from "../controllers/user.controller.js";
import {protectRoute} from "../middleware/auth.js";

const userRoute = Router();

//http://localhost:3000/api/v1/user/:username/get-user
userRoute.get('/:username/get-user', protectRoute ,getUserByProfile);


export default userRoute;