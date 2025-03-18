import express from "express";
// import { authenticateToken } from '../utilities.js';
export const paroleRouter = express.Router();
import {

  addBehaviorLog,
  getParoleRecordById,
  deleteParoleRecord,
  getAllParoleRecords,
} from "../controller/parole.controller.js";
paroleRouter.post('/add/:inmateId', addBehaviorLog);
paroleRouter.get("/", getAllParoleRecords);
paroleRouter.get("/:inmateId", getParoleRecordById);
paroleRouter.delete("/:inmateId", deleteParoleRecord);
