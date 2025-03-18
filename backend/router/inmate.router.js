import express from 'express'
import { authenticateToken } from '../utilities.js';
import { addnewInmate, deleteInmate, getAllInmates, getInmate, updateInmate } from '../controller/inmate.controller.js';
export const inmateRouter=express.Router();
inmateRouter.post('/new-inmate',authenticateToken,addnewInmate);
inmateRouter.get('/allInmates',authenticateToken,getAllInmates);
inmateRouter.get('/get-inmate/:id',authenticateToken,getInmate);
inmateRouter.put('/update-inmate/:id',authenticateToken,updateInmate);
inmateRouter.delete('/delete-inmate/:id',authenticateToken,deleteInmate);

