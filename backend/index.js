import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js';
import { userRouter } from './router/user.router.js';
import { visitorRouter } from './router/visitor.router.js';
import { incidentRouter } from './router/incident.router.js';
import { inmateRouter } from './router/inmate.router.js';
import { prisonRouter } from './router/prison.router.js';
import { paroleRouter } from './router/parole.router.js';
// import { clearanceRoutes } from './router/notice.router.js';
import { clearanceRoutes } from './router/clearance.router.js';
import { noticeRouter } from './router/notice.router.js';
import path from 'path';
import dotenv from'dotenv';

import { fileURLToPath } from 'url';
import { instructionRouter } from './router/instruction.router.js';
import { transferRouter } from './router/transfer.router.js';
import { MessageRoutes } from './router/hompage.router.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app =express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials: true,
    
}));
 app.use('/user',userRouter);
 app.use('/visitor',visitorRouter);
 app.use('/incidents',incidentRouter);
 app.use('/inmates',inmateRouter);
 app.use('/prison',prisonRouter);
 app.use('/parole-tracking',paroleRouter);
 app.use('/notice',noticeRouter);
 app.use('/instruction',instructionRouter);
 app.use('/transfer',transferRouter);
//  app.use('/clearance',clearanceRouter);
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 app.use("/clearance", clearanceRoutes);
 app.use('/managemessages',MessageRoutes)

 connectDb();

app.listen(5000,()=>{
    console.log("server running")
});

