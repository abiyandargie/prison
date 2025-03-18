import express from 'express'
import { authenticateToken } from '../utilities.js';
import { addnewIncident, deleteIncident, getAllIncidents, updateIncident } from '../controller/incident.controller.js';
import { upload } from '../fileMiddleware.js';
export const incidentRouter=express.Router();
incidentRouter.post('/new-incident', upload.single("attachment") ,authenticateToken,addnewIncident);
incidentRouter.get('/allIncidents',authenticateToken,getAllIncidents);
incidentRouter.get('/get-incident/:id',authenticateToken,getAllIncidents);
incidentRouter.put('/update-incident/:id',authenticateToken,updateIncident);
incidentRouter.delete('/update-incident/:id',authenticateToken,deleteIncident);
