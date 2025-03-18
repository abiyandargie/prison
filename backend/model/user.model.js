
import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    firstName:{
        type:String ,
        required:true
    },
    middleName:{
        type:String ,
        required:true
    },
    lastName:{
        type:String ,
        required:true
    },
    email:{
        type:String ,
        required:true
    },
    gender:{
        type:String ,
        required:true
    },
    role:{
        type:String ,
        required:true
    },
    isactivated:{
    type:Boolean,
    default:false,
    },
    photo:{
        type:String ,
        default:"",
    },
    password:{
        type:String ,
        required:true
    }
},{timestamps:true});
export const User=mongoose.model('User',userSchema);

