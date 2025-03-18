import { Visitor } from "../model/visitor.model.js";


export const visitorInformation = async (req, res) => {
  try {

    const user= req.user
   const userId=user.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID not found" });
    }

    const { inmate, firstName, middleName, lastName, relation, purpose, phone, date } = req.body;

    if (!inmate || !firstName || !relation || !phone || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let visitor = await Visitor.findOne({ visitorId: userId });

    if (visitor) {
      visitor.inmate = inmate;
      visitor.firstName = firstName;
      visitor.middleName = middleName;
      visitor.lastName = lastName;
      visitor.relation = relation;
      visitor.purpose = purpose;
      visitor.phone = phone;
      visitor.date = new Date(date);
    } else {
      visitor = new Visitor({
        visitorId: userId, // Corrected
        inmate,
        firstName,
        middleName,
        lastName,
        relation,
        purpose,
        phone,
        date: new Date(date),
      });
    }

    await visitor.save();
    res.status(200).json({ visitor, message: "Visitor information saved successfully" });
  } catch (error) {
    console.error("Error in visitorInformation:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateVisitor = async (req, res) => {
  try {
    const { id } = req.params;
    const { inmate, visitorsName, relation, phone, date } = req.body;

    if (!inmate || !visitorsName || !relation || !phone || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedVisitor = await Visitor.findByIdAndUpdate(
      id,
      { inmate, visitorsName, relation, phone, date },
      { new: true} 
    );

    if (!updatedVisitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    res.status(200).json({ data: updatedVisitor, message: "Visitor information updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Visitors
export const allVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.status(200).json({ visitors, message: "All Visitors" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Visitor
export const deleteVisitor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVisitor = await Visitor.findByIdAndDelete(id);

    if (!deletedVisitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    res.status(200).json({ message: "Visitor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getVisitor = async (req, res) => {
  try {
    const {id}=req.params;
    const viistorInfo = await Visitor.findOne({ _id: id });
    if (!viistorInfo) {
      return res.status(400).json({ message: "Visitor does not exist" });
    }

    res.status(200).json({ visitor: viistorInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};