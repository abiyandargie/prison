import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
export const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Data base connected Successfully")
    }).catch((err)=>{
        console.log(err);
    })
}