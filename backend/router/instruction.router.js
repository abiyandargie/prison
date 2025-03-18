import express from 'express';
import { authenticateToken } from '../utilities.js';
import { upload } from '../fileMiddleware.js';
import { addInstruction, deleteInstruction, getAllInstruction, getInstruction, updateInstruction } from '../controller/instruction.controller.js';

export const instructionRouter = express.Router();

instructionRouter.post(
  '/add-new',
  authenticateToken,
  upload.fields([
    { name: 'attachment', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
  ]),
  addInstruction
);
instructionRouter.get('/allInstruction',authenticateToken,getAllInstruction);
instructionRouter.get('/get-instruct/:id',authenticateToken,getInstruction);
instructionRouter.put(
    '/edit/:id',
    authenticateToken,
    upload.fields([
      { name: 'attachment', maxCount: 1 },
      { name: 'signature', maxCount: 1 },
    ]),
    updateInstruction
  );
instructionRouter.delete('/delete/:id',authenticateToken,deleteInstruction);
