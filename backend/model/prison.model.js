
import mongoose from "mongoose";
const prisonSchema=new mongoose.Schema({
    prison_name:{
        type:String ,
        required:true
    },
    location:{
        type:String ,
        required:true
    },
    description:{
        type:String ,
        required:true
    },
    
},{timestamps:true});
export const Prison=mongoose.model('Prison',prisonSchema);

