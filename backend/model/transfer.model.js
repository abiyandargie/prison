import mongoose from "mongoose";
const transferSchema = new mongoose.Schema({
    fromPrison: { type: String, required: true },
    toPrison: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    transferDate: { type: Date, required: true },
        firstName: { type: String, required: true },
        middleName: { type: String, required: true },
        lastName: { type: String, required: true },
        dateOfBirth: { type: Date },
        gender: { type: String },
        crime: { type: String },
        sentenceStart: { type: Date },
        sentenceEnd: { type: Date },
        paroleEligibility: { type: Boolean },
        medicalConditions: { type: String },
        riskLevel: { type: String, enum: ['Low', 'Medium', 'High'] },
    
       
    
}, { timestamps: true });
export const Transfer= mongoose.model('Transfer', transferSchema);
