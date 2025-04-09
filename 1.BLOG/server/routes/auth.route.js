import {Router} from "express";
import {protectRoute} from "../middleware/auth.js";
import {currentUser, signIn, signOut, signUp} from "../controllers/auth.controller.js";

const authRouter = Router();
//http://localhost:3000/api/v1/auth/sign-up
authRouter.post('/sign-up', signUp);
//http://localhost:3000/api/v1/auth/sign-in
authRouter.post('/sign-in', signIn);
//http://localhost:3000/api/v1/auth/sign-out
authRouter.post('/sign-out', signOut);

authRouter.get('/current-user', protectRoute, currentUser)

export default authRouter;