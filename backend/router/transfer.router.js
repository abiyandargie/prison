import express from 'express'
import { authenticateToken } from '../utilities.js';
import { addNewTransfer, AllTransfers, deleteTransfer, getTransfer, updateTransfer } from '../controller/transfer.controller.js';

export const transferRouter=express.Router();
transferRouter.post('/new-transfer',addNewTransfer);
transferRouter.get('/getall-transfers',AllTransfers);
transferRouter.get('/get-transfer/:id',getTransfer);
transferRouter.put('/update-transfer/:id',updateTransfer);
transferRouter.delete('/delete-transfer/:id',deleteTransfer);