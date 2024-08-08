import { getUser, patchUser, signup, logout, tokenLogin, getUsers } from "../controllers/user_controller.js";
import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";


// Create router
export const userRouter = Router()


// Define routes
userRouter.post('/users/auth/signup', signup);

userRouter.post('/users/auth/logout', checkAuth, logout);

userRouter.get('/users', getUsers);

userRouter.get('/users/auth/:userName', getUser);

userRouter.patch('/users/:id', checkAuth, patchUser);

userRouter.post('/users/auth/token/login', tokenLogin)
