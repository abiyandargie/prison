import mongoose from 'mongoose'

const InmateSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    age: { type: Number, required: true },
    motherName: { type: String },
    gender: { type: String, enum: ["male", "female"], required: true },

    // Birth Place
    birthRegion: { type: String },
    birthZone: { type: String },
    birthWereda: { type: String },
    birthKebele: { type: String },

    // Current Living Place
    currentRegion: { type: String },
    currentZone: { type: String },
    currentWereda: { type: String },
    currentKebele: { type: String },

    // Personal Details
    degreeLevel: { type: String },
    work: { type: String },
    nationality: { type: String },
    religion: { type: String },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
    },
    height: { type: Number },

    // Physical Features
    hairType: { type: String },
    face: { type: String },
    foreHead: { type: String },
    nose: { type: String },
    eyeColor: { type: String },
    teeth: { type: String },
    lip: { type: String },
    ear: { type: String },
    specialSymbol: { type: String },

    // Contact Information
    contactName: { type: String },
    contactRegion: { type: String },
    contactZone: { type: String },
    contactWereda: { type: String },
    contactKebele: { type: String },
    phoneNumber: { type: String },

    // Registrar Details
    registrarWorkerName: { type: String, required: true },
    signature: { type: String }, // Store image file path or URL

    // Case Details
    caseType: { type: String },
    paroleDate: { type: Date },
    releaseReason: { type: String },
    releasedDate: { type: Date },

    // Timestamps for createdAt and updatedAt
  },
  { timestamps: true }
);

export const Inmate = mongoose.model("Inmate", InmateSchema);
