import { Prison } from "../model/prison.model.js";
export const addnewPrison = async (req, res) => {
  try {
    const {
        prison_name,
        location,
        description,
    } = req.body;
    if (!prison_name || !location || !description) {
      return res.status(400).json("all fields required");
    }

    const newPrison = new Prison({
        prison_name,
        location,
        description,
    });
    await newPrison.save();

    return res.status(201).json({
      error: false,
      message: "New Prison registered successfully",
    });
  } catch (error) {
    console.log(error);
  }
};


export const getAllPrisons = async (req, res) => {
  try {
    const Prisons = await Prison.find();

    if (!Prisons) {
      return res.status(400).json({ message: "Prison does not exist" });
    }

    res.status(200).json({ prisons: Prisons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

 export const getPrison = async (req, res) => {
    try {
      const { id } = req.params;
      const prisonInfo = await Prison.findOne({ _id: id });
      if (!prisonInfo) {
        return res.status(400).json({ message: "Prison does not exist" });
      }
  
      res.status(200).json({ prison: prisonInfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };


  export const updatePrison = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        prison_name,
        location,
        description,
      } = req.body;
  
      if (!prison_name || !location || !description ) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const updateprison = await Prison.findByIdAndUpdate(
        id,
        {
            prison_name,
            location,
            description,
        },
        { new: true }
      );
  
      if (!updateprison) {
        return res.status(404).json({ message: "Prison not found" });
      }
  
      res
        .status(200)
        .json({
          data: updateprison,
          message: "Prison information updated successfully",
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const deletePrison = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPrison = await Prison.findByIdAndDelete(id);
  
      if (!deletedPrison) {
        return res.status(404).json({ message: "Prison not found" });
      }
  
      res.status(200).json({ message: "Prison deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };