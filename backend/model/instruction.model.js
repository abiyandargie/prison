
import mongoose from "mongoose";
const InstructionSchema=new mongoose.Schema({
    courtCaseNumber:{
        type:String ,
        required:true
    },
    judgeName:{
        type:String ,
        required:true
    },
    prisonName:{
        type:String ,
        required:true
    },
    verdict:{
        type:String ,
        required:true
    },
    instructions:{
        type:String ,
        required:true
    },
    hearingDate: {
        type:Date ,
        required:true
    },
    effectiveDate:{
        type:Date ,
        required:true
    },
    sendDate:{
        type:Date ,
        required:true
    }

    
},{timestamps:true});
export const Instruction=mongoose.model('Instruction',InstructionSchema);

