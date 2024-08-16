import { patchUser, signup, logout, tokenLogin, getUsers, getUserById, deleteUser } from "../controllers/user_controller.js";
import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";


// Create router
export const userRouter = Router()


// Define routes
userRouter.post('/users/auth/signup', signup);

userRouter.post('/users/auth/token/login', tokenLogin);

userRouter.get('/users/auth/:id', getUserById);

userRouter.get('/users', getUsers);

userRouter.patch('/users/:id', checkAuth, patchUser);

userRouter.post('/users/auth/logout', checkAuth, logout);

userRouter.delete('/users/:id', checkAuth, deleteUser);