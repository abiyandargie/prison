import express from 'express'
import { createAccount,getUser,getAllUsers,login, updateUser, updatePassword, activateUser, deleteUser, ForgotPassword, ResetPassword } from '../controller/user.controller.js';
import { authenticateToken } from '../utilities.js';
import { upload } from '../fileMiddleware.js';
export const userRouter=express.Router();
userRouter.post('/create-account',upload.single("photo"),createAccount);
userRouter.post('/login',login);
userRouter.get('/getAlluser',authenticateToken,getAllUsers);
userRouter.get('/get-user/:id',authenticateToken,getUser);
userRouter.put('/update-user/:id',upload.single("photo"),authenticateToken,updateUser);
userRouter.put('/update-password',authenticateToken,updatePassword);
userRouter.put('/activate-user/:id',authenticateToken,activateUser);
userRouter.delete('/delete-user/:id',authenticateToken,deleteUser);
userRouter.post('/forget',ForgotPassword);
userRouter.post('/reset/:id/:token', ResetPassword);