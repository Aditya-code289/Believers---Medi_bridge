import {Router} from 'express';
import * as authController from '../controller/auth.controller.js'

const authRouter = Router() 

//now we write logic in controller folder , not here in req,res arrow function bcoz it will make code messy 
// this route is /api/auth/register
authRouter.post('/register',authController.Register);

//now route to identify user is valid or not 
// /api/auth/get-me
authRouter.get('/get-me',authController.get_me);


//rout to get new refresh token 
// /api/auth/refresh-token  //get
authRouter.get('/refresh-token',authController.refreshToken);

//login route
// /api/auth/login  //post
authRouter.post('/login',authController.login);

//used to verify email 
// /api/auth/verify-email 

authRouter.get('/verify-email',authController.verifyEmail);


export default authRouter