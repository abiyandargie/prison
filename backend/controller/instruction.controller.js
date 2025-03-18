import { Instruction } from "../model/instruction.model.js";


export const addInstruction = async (req, res) => {
  try {
    
    const { 
        courtCaseNumber,
        judgeName,
        prisonName,
        verdict,
        instructions,
        hearingDate,
        effectiveDate,
        sendDate } = req.body;
        const { signature, attachment } = req.files;

const signatureFilename = signature[0].filename; 
const attachmentFilename = attachment[0].filename;
  
    // Validate required fields
    if (!prisonName || !instructions || !effectiveDate || !sendDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newInstruction = new Instruction({
        prisonerName,
        courtCaseNumber,
        judgeName,
        prisonName,
        verdict,
        instructions,
        hearingDate,
        effectiveDate,
        sendDate ,
        signature:signatureFilename,
         attachment:attachmentFilename
    });

    await newInstruction.save();
    res.status(201).json({ success: true, message: "Instruction added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add the Instruction", error: error.message });
  }
};


export const getAllInstruction = async (req, res) => {
  try {
    const instructions = await Instruction.find();
    if (!instructions) {
      return res.status(400).json({ message: "instruction does not exist" });
    }

    res.status(200).json({ instructions: instructions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateInstruction = async (req, res) => {
  try {
    const  {id}  = req.params;
    
    const { 
      courtCaseNumber,
      judgeName,
      prisonName,
      verdict,
      instructions,
      hearingDate,
      effectiveDate,
      sendDate } = req.body;
      const { signature, attachment } = req.files;

const signatureFilename = signature[0].filename; 
const attachmentFilename = attachment[0].filename;

        if (!courtCaseNumber || !prisonName || !instructions|| !hearingDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedClearance = await Instruction.findByIdAndUpdate(
      id,
      {     
        courtCaseNumber,
        judgeName,
        prisonName,
        verdict,
        instructions,
        hearingDate,
        effectiveDate,
        sendDate ,
        signature:signatureFilename,
         attachment:attachmentFilename},
      { new: true} 
    );

    if (!updatedClearance) {
      return res.status(404).json({ message: "Clearance not found" });
    }

    res.status(200).json({ data: updatedClearance, message: "Clearance updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteInstruction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInstruct = await Instruction.findByIdAndDelete(id);

    if (!deletedInstruct) {
      return res.status(404).json({ message: "Instruction not found" });
    }

    res.status(200).json({ message: "Instruction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

 export const getInstruction = async (req, res) => {
   try {
     const { id } = req.params;
     const instruct = await Instruction.findOne({ _id: id });
     if (!instruct) {
       return res.status(400).json({ message: "instruction does not exist" });
     }
 
     res.status(200).json({ instruction: instruct });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Server error" });
   }
 };
 