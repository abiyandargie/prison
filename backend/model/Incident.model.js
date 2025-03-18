
import mongoose from "mongoose";
const incidentSchema=new mongoose.Schema({
    incidentId:{
        type:String ,
        required:true
    },
    reporter:{
        type:String ,
        required:true
    },
    inmate:{
        type:String ,
        required:true
    },
    incidentDate:{
        type:Date ,
        required:true
    },
    incidentType:{
        type:String ,
        required:true
    },
    status:{
        type:String ,
        required:true
    },
    attachment:{
        type:String ,
        required:true
    },
    description:{
        type:String ,
        required:true,
    },
    
},{timestamps:true});
export const Incident=mongoose.model('Incident',incidentSchema);

