import express from 'express'
import { authenticateToken } from '../utilities.js';
import { allVisitors, deleteVisitor, getVisitor, updateVisitor, visitorInformation } from '../controller/visitor.controller.js';
export const visitorRouter=express.Router();
visitorRouter.post('/new-visitor',authenticateToken,visitorInformation);
visitorRouter.get('/allVisitors',authenticateToken,allVisitors);
visitorRouter.get('/get-Visitor/:id',authenticateToken,getVisitor);
visitorRouter.put('/update-Visitor/:id',authenticateToken,updateVisitor);
visitorRouter.delete('/delete-Visitor/:id',authenticateToken,deleteVisitor);