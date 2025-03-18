// import { Clearance } from "../model/clearance.model.js";


// export const addClearance = async (req, res) => {
//   try {
//     const { date, inmate, reason, remark, } = req.body;
//     const sign=req.file.filename;
//     // Validate required fields
//     if (!date || !inmate || !reason || !remark) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newClearance = new Clearance({
//       date,
//       inmate,
//       reason,
//       remark,
//       sign: sign || "", // Default to empty string if not provided
//     });

//     await newClearance.save();
//     res.status(201).json({ success: true, message: "Clearance added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to add the clearance", error: error.message });
//   }
// };


// export const getAllClearance = async (req, res) => {
//   try {
//     const clearances = await Clearance.find();
//     if (!clearances) {
//       return res.status(400).json({ message: "Clearance does not exist" });
//     }

//     res.status(200).json({ clearances: clearances });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// export const updateClearance = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {  date,
//         inmate,
//         reason,
//         remark,
//         sign} = req.body;

//         if (!date || !inmate || !reason|| !remark) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const updatedClearance = await Clearance.findByIdAndUpdate(
//       id,
//       {    date,
//         inmate,
//         reason,
//         remark,
//         sign},
//       { new: true} 
//     );

//     if (!updatedClearance) {
//       return res.status(404).json({ message: "Clearance not found" });
//     }

//     res.status(200).json({ data: updatedClearance, message: "Clearance updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const deleteClearance = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedClearance = await Clearance.findByIdAndDelete(id);

//     if (!deletedClearance) {
//       return res.status(404).json({ message: "Clearance not found" });
//     }

//     res.status(200).json({ message: "Clearance deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

//  export const getClearance = async (req, res) => {
//    try {
//      const { id } = req.params;
//      const clearanceInfo = await Clearance.findOne({ _id: id });
//      if (!clearanceInfo) {
//        return res.status(400).json({ message: "Clearance does not exist" });
//      }
 
//      res.status(200).json({ clearance: clearanceInfo });
//    } catch (error) {
//      console.error(error);
//      res.status(500).json({ message: "Server error" });
//    }
//  };
 

import { Clearance } from "../model/clearance.model.js";

// Get all clearances
export const getAllClearances = async (req, res) => {
  try {
    const clearances = await Clearance.find();
    res.status(200).json({ success: true, clearances });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get a single clearance by ID
export const getClearanceById = async (req, res) => {
  try {
    const clearance = await Clearance.findById(req.params.id);
    if (!clearance) {
      return res.status(404).json({ success: false, message: "Clearance not found" });
    }
    res.status(200).json({ success: true, clearance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create a new clearance
export const createClearance = async (req, res) => {
  try {
    const { date, inmate, reason, remark, sign } = req.body;
    const newClearance = new Clearance({ date, inmate, reason, remark, sign });
    await newClearance.save();
    res.status(201).json({ success: true, message: "Clearance created successfully", newClearance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create clearance" });
  }
};

// Update a clearance
export const updateClearance = async (req, res) => {
  try {
    const updatedClearance = await Clearance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClearance) {
      return res.status(404).json({ success: false, message: "Clearance not found" });
    }
    res.status(200).json({ success: true, message: "Clearance updated successfully", updatedClearance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update clearance" });
  }
};

// Delete a clearance
export const deleteClearance = async (req, res) => {
  try {
    const deletedClearance = await Clearance.findByIdAndDelete(req.params.id);
    if (!deletedClearance) {
      return res.status(404).json({ success: false, message: "Clearance not found" });
    }
    res.status(200).json({ success: true, message: "Clearance deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete clearance" });
  }
};
