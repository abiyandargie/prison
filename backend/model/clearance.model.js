
import mongoose from "mongoose";
const clearanceSchema=new mongoose.Schema({
    date:{
        type:Date ,
        required:true
    },
   
    inmate:{
        type:String ,
        required:true
    },
    reason:{
        type:String ,
        required:true
    },
    remark:{
        type:String ,
        required:true
    },
    sign:{
        type:String ,
        
    },
   
    
},{timestamps:true});
export const Clearance=mongoose.model('Clearance',clearanceSchema);

