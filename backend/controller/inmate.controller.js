import { Inmate } from "../model/inmate.model.js";
export const addnewInmate = async (req, res) => {
    try {
      
        const {
            fullName,
            birthDate,
            age,
            motherName,
            gender,
            birthRegion,
            birthZone,
            birthWereda,
            birthKebele,
            currentRegion,
            currentZone,
            currentWereda,
            currentKebele,
            degreeLevel,
            work,
            nationality,
            religion,
            maritalStatus,
            height,
            hairType,
            face,
            foreHead,
            nose,
            eyeColor,
            teeth,
            lip,
            ear,
            specialSymbol,
            contactName,
            contactRegion,
            contactZone,
            contactWereda,
            contactKebele,
            phoneNumber,
            registrarWorkerName,
            caseType,
            paroleDate,
            releaseReason,
            releasedDate
          } = req.body;
          if (!fullName || !age || !gender) {
            return res.status(400).json("all fields required");
          }
          
          const newInmate= new Inmate({
            fullName,
            birthDate,
            age,
            motherName,
            gender,
            birthRegion,
            birthZone,
            birthWereda,
            birthKebele,
            currentRegion,
            currentZone,
            currentWereda,
            currentKebele,
            degreeLevel,
            work,
            nationality,
            religion,
            maritalStatus,
            height,
            hairType,
            face,
            foreHead,
            nose,
            eyeColor,
            teeth,
            lip,
            ear,
            specialSymbol,
            contactName,
            contactRegion,
            contactZone,
            contactWereda,
            contactKebele,
            phoneNumber,
            registrarWorkerName,
            caseType,
            paroleDate,
            releaseReason,
            releasedDate
          });
          await newInmate.save();
        
          return res.status(201).json({
            error: false,
            message: "New Inmate registered successfully",
          });
        
    } catch (error) {
        console.log(error)
    }
 
};

export const getAllInmates = async (req, res) => {
    try {
      const Incidents = await Inmate.find();
  
      if (!Incidents) {
        return res.status(400).json({ message: "Inmate does not exist" });
      }
  
      res.status(200).json({ inmates: Incidents });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };


  export const updateInmate = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        fullName,
        birthDate,
        age,
        motherName,
        gender,
        birthRegion,
        birthZone,
        birthWereda,
        birthKebele,
        currentRegion,
        currentZone,
        currentWereda,
        currentKebele,
        degreeLevel,
        work,
        nationality,
        religion,
        maritalStatus,
        height,
        hairType,
        face,
        foreHead,
        nose,
        eyeColor,
        teeth,
        lip,
        ear,
        specialSymbol,
        contactName,
        contactRegion,
        contactZone,
        contactWereda,
        contactKebele,
        phoneNumber,
        registrarWorkerName,
        caseType,
        paroleDate,
        releaseReason,
        releasedDate
      } = req.body;
  
      if (!fullName || !phoneNumber || !motherName || !age || !gender) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const updateInmate = await Inmate.findByIdAndUpdate(
        id,
        {
          fullName,
            birthDate,
            age,
            motherName,
            gender,
            birthRegion,
            birthZone,
            birthWereda,
            birthKebele,
            currentRegion,
            currentZone,
            currentWereda,
            currentKebele,
            degreeLevel,
            work,
            nationality,
            religion,
            maritalStatus,
            height,
            hairType,
            face,
            foreHead,
            nose,
            eyeColor,
            teeth,
            lip,
            ear,
            specialSymbol,
            contactName,
            contactRegion,
            contactZone,
            contactWereda,
            contactKebele,
            phoneNumber,
            registrarWorkerName,
            caseType,
            paroleDate,
            releaseReason,
            releasedDate
        },
        { new: true }
      );
  
      if (!updateInmate) {
        return res.status(404).json({ message: "Inmate not found" });
      }
  
      res
        .status(200)
        .json({
          data: updateInmate,
          message: "Inmate information updated successfully",
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const getInmate = async (req, res) => {
    try {
      const { id } = req.params;
      const inmateInfo = await Inmate.findOne({ _id: id });
      if (!inmateInfo) {
        return res.status(400).json({ message: "Inmate does not exist" });
      }
  
      res.status(200).json({ inmate: inmateInfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const deleteInmate = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedInmate = await Inmate.findByIdAndDelete(id);
  
      if (!deletedInmate) {
        return res.status(404).json({ message: "Inmate not found" });
      }
  
      res.status(200).json({ message: "Inmate deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
