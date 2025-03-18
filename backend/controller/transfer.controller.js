import {Transfer} from '../model/transfer.model.js'
 

// Create Transfer Request
export const addNewTransfer= async (req, res) => {
    try {
        console.log(req.body);
        const transfer = new Transfer(req.body);
        await transfer.save();
        res.status(201).json(transfer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Transfers
export const AllTransfers=async (req, res) => {
    try {
        const transfers = await Transfer.find();
        res.json({transfers:transfers} );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getTransfer = async (req, res) => {
    try {
        const { id } = req.params;  
        const transfer = await Transfer.findById(id);
        
        if (!transfer) {
            return res.status(404).json({ message: "Transfer not found" }); 
        }

        res.json({ transfer:transfer });
    } catch (error) {
        console.error("Error fetching transfer:", error.message); 
        res.status(500).json({ error: "Server Error", details: error.message });
    }
};



 export const updateTransfer =async (req, res) => {
 
    try {
        const { id } = req.params;  
        const transfer = await Transfer.findByIdAndUpdate(id, req.body, { new: true });
        if (!transfer) {
            console.error("Error fetching transfer:", error.message); 
            return res.status(404).json({ message: "Transfer not found" }); 
        }
        res.json(transfer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 export const deleteTransfer = async (req, res) => {
      try {
        const { id } = req.params;
        const deletedInmate = await Transfer.findByIdAndDelete(id);
    
        if (!deletedInmate) {
          return res.status(404).json({ message: "Transfer inmate not found" });
        }
    
        res.status(200).json({ message: "Transfer deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
