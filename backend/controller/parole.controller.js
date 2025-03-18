
import {ParoleTracking} from'../model/parole.model.js'
import {Inmate} from '../model/inmate.model.js' 
// export const createParoleTracking = async (req, res) => {
//   try {
//     const { inmateId, sentence } = req.body;
//     const inmate = await Inmate.findById(inmateId);
//     if (!inmate) {
//       return res.status(404).json({ message: "Inmate not found" });
//     }
//     const newParoleTracking = new ParoleTracking({
//       inmate: inmateId,
//       sentence,
//     });
//     await newParoleTracking.save();
//     res.status(201).json({ message: "Parole tracking record created", data: newParoleTracking });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const addBehaviorLog = async (req, res) => {
  try {
    const { behaviorLogs } = req.body;
    const { inmateId } = req.params;
    // Validate behaviorLogs array
    if (!Array.isArray(behaviorLogs) || behaviorLogs.length === 0) {
      return res.status(400).json({ message: "Invalid or empty behaviorLogs data." });
    }

    // Find existing ParoleTracking document
    let paroleTracking = await ParoleTracking.findOne({ inmateId });

    // If no existing tracking record, create a new one
    if (!paroleTracking) {
      paroleTracking = new ParoleTracking({ inmateId, behaviorLogs: [] });
    }

    // Update or add new behavior logs
    behaviorLogs.forEach((log) => {
      const existingLogIndex = paroleTracking.behaviorLogs.findIndex(
        (entry) =>
          entry.rule === log.behaviorType &&
          new Date(entry.date).toISOString() === new Date(log.date).toISOString()
      );

      if (existingLogIndex !== -1) {
        // Update existing log points
        paroleTracking.behaviorLogs[existingLogIndex].points = log.points;
      } else {
        // Add new log entry
        paroleTracking.behaviorLogs.push({
          rule: log.behaviorType,
          points: log.points,
          date: log.date,
        });
      }
    });

    // Recalculate points & save
    await paroleTracking.calculatePoints(); // Ensure this method is correctly defined
    await paroleTracking.save();

    res.status(200).json({ message: "Behavior log(s) added/updated", data: paroleTracking });
  } catch (error) {
    console.error("Error in addBehaviorLog:", error);
    res.status(500).json({ message: error.message });
  }
};


 
export const getAllParoleRecords = async (req, res) => {
  try {
    const records = await ParoleTracking.find().populate("inmate", "name age gender");
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getParoleRecord = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const inmateInfo = await Inmate.findOne({ _id: id });
//     if (!inmateInfo) {
//       return res.status(400).json({ message: "Inmate does not exist" });
//     }

//     res.status(200).json({ inmate: inmateInfo });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };




export const getParoleRecordById = async (req, res) => {
  const { inmateId } = req.params;
  try {
    const paroleTracking = await ParoleTracking.findOne({inmateId});
   

    if (!paroleTracking) {
      return res.status(404).json({ message: "Parole tracking record not found" });
    }

    res.status(200).json(paroleTracking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteParoleRecord = async (req, res) => {
  try {
    const paroleTracking = await ParoleTracking.findById(req.params.inmateId);
    if (!paroleTracking) {
      return res.status(404).json({ message: "Parole tracking record not found" });
    }
    await paroleTracking.deleteOne();
    res.status(200).json({ message: "Parole tracking record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
