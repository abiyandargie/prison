import { Incident } from "../model/Incident.model.js";


export const addnewIncident = async (req, res) => {
  try {
    const { description, incidentDate, incidentId, incidentType, inmate, reporter, status } = req.body;
    const attachment = req.file ? req.file.filename : null;

    // Log file information for debugging
    console.log(req.file);

    // Validate mandatory fields
    if (!inmate || !reporter || !incidentType) {
      return res.status(400).json({ error: true, message: "All fields (inmate, reporter, incidentType) are required." });
    }

    // Validate if the file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: true, message: "Attachment file is required." });
    }

    // You can add additional file validation here (e.g., file type, size)
    // Example: Check file type (e.g., only allow images or PDFs)
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedFileTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: true, message: "Only image and PDF files are allowed." });
    }

    // Create new incident
    const newIncident = new Incident({
      attachment,
      description,
      incidentDate,
      incidentId,
      incidentType,
      inmate,
      reporter,
      status,
    });

    // Save the incident
    await newIncident.save();

    return res.status(201).json({
      error: false,
      message: "New Incident registered successfully",
      incident: newIncident,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "An error occurred while registering the incident." });
  }
};


export const getAllIncidents = async (req, res) => {
  try {
    const Incidents = await Incident.find();

    if (!Incidents) {
      return res.status(400).json({ message: "Incident does not exist" });
    }

    res.status(200).json({ incidents: Incidents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const incidentInfo = await Incident.findOne({ _id: id });
    if (!incidentInfo) {
      return res.status(400).json({ message: "Incident does not exist" });
    }

    res.status(200).json({ incident: incidentInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      attachment,
      description,
      incidentDate,
      incidentId,
      incidentType,
      inmate,
      reporter,
      status,
    } = req.body;

    if (!inmate || !reporter || !status || !incidentDate || !incidentType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updateIncident = await Incident.findByIdAndUpdate(
      id,
      {
        attachment,
        description,
        incidentDate,
        incidentId,
        incidentType,
        inmate,
        reporter,
        status,
      },
      { new: true }
    );

    if (!updateIncident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res
      .status(200)
      .json({
        data: updateIncident,
        message: "Incident information updated successfully",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIncident = await Incident.findByIdAndDelete(id);

    if (!deletedIncident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json({ message: "Incident deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
