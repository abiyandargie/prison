import express from 'express'
import { authenticateToken } from '../utilities.js';
import { addnewPrison, deletePrison, getAllPrisons, getPrison, updatePrison } from '../controller/prison.controller.js';
export const prisonRouter=express.Router();
prisonRouter.post('/new-prison',authenticateToken,addnewPrison);
prisonRouter.get('/getall-prisons',authenticateToken,getAllPrisons);
prisonRouter.get('/get-prison/:id',authenticateToken,getPrison);
prisonRouter.put('/update-prison/:id',authenticateToken,updatePrison);
prisonRouter.delete('/delete-prison/:id',authenticateToken,deletePrison);