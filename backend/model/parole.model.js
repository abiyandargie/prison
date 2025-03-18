
import mongoose from 'mongoose'
const ParoleTrackingSchema = new mongoose.Schema({
  inmateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inmate", // Reference to the inmate model
    required: true,
  },
  behaviorLogs: [
    {
      rule: {
        type: String,
        enum: [
          "Following prison rules",
          "Attending rehabilitation programs",
          "Helping other inmates",
          "Addiction",
          "No Fighting or violence",
          "Not Attempting escape",
          "Submit Behavior Log",
        ],
        required: true,
      },
      points: {
        type: Number,
        enum: [1, 3, 5, 10], // Points associated with each behavior
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  totalPoints: {
    type: Number,
    default: 0,
  },
  paroleEligible: {
    type: Boolean,
    default: false,
  },
});

ParoleTrackingSchema.methods.calculatePoints = function () {
  this.totalPoints = this.behaviorLogs.reduce((sum, log) => sum + log.points, 0);
  this.paroleEligible = this.totalPoints >= 75; // Example threshold for parole
  return this.save();
};

export const ParoleTracking = mongoose.model("ParoleTracking", ParoleTrackingSchema);
 