// import { Notice } from "../model/notice.model.js";


// export const addNotice = async (req, res) => {
//   try {
//     const { title, description, roles, date, priority } = req.body;
//     if (!title || !description || !roles.length || !date) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const noticeDate = new Date(date);
//     if (noticeDate < new Date()) {
//       return res.status(400).json({ message: "Date must be in the future" });
//     }

//     const newNotice = new Notice({
//       title,
//       description,
//       roles,
//       date,
//       priority: priority || "Normal",  
//     });

//     await newNotice.save();
//     res.status(201).json({ success: true, message: "Notice Added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to post the notice", error: error.message });
//   }
// };


// export const getAllNotices = async (req, res) => {
//   try {
//     const notices = await Notice.find();
//     if (!notices) {
//       return res.status(400).json({ message: "Notice does not exist" });
//     }

//     res.status(200).json({ notices: notices });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// export const updateNotice = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {  title,
//       description,
//       roles,
//       date,
//       priority} = req.body;

//     if (!title || !description || !roles || !date || !priority) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const updateduser = await Notice.findByIdAndUpdate(
//       id,
//       {   title,
//         description,
//         roles,
//         date,
//         priority},
//       { new: true} 
//     );

//     if (!updateduser) {
//       return res.status(404).json({ message: "Notice not found" });
//     }

//     res.status(200).json({ data: updateduser, message: "Notice updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const deleteNotice = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedNotice = await Notice.findByIdAndDelete(id);

//     if (!deletedNotice) {
//       return res.status(404).json({ message: "Notice not found" });
//     }

//     res.status(200).json({ message: "Notice deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

//  export const postNotice = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { isPosted } = req.body;
//       if (isPosted === undefined) {
//         return res.status(400).json({ message: "All fields are required" });
//       }
  
//       const postNotice = await Notice.findByIdAndUpdate(
//         id,
//         { isPosted },
//         { new: true }
//       );
  
//       if (!postNotice) {
//         return res.status(404).json({ message: "Notice not found" });
//       }
  
//       res.status(200).json({ data: postNotice, message: "Notice Posted" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   };
// export const getNotice = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const noticeInfo = await Notice.findOne({ _id: id });
//     if (!noticeInfo) {
//       return res.status(400).json({ message: "Notice does not exist" });
//     }

//     res.status(200).json({ notice: noticeInfo });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import { Notice } from "../model/notice.model.js";

// ✅ Add a New Notice
export const addNotice = async (req, res) => {
  try {
    const { title, description, roles, date, priority } = req.body;
    if (!title || !description || !roles.length || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const noticeDate = new Date(date);
    if (noticeDate < new Date()) {
      return res.status(400).json({ success: false, message: "Date must be in the future" });
    }

    const newNotice = new Notice({
      title,
      description,
      roles,
      date,
      priority: priority || "Normal",
    });

    await newNotice.save();
    res.status(201).json({ success: true, message: "Notice added successfully", data: newNotice });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add notice", error: error.message });
  }
};

// ✅ Get All Notices
export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json({ success: true, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get a Single Notice by ID
export const getNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findById(id);
    if (!notice) {
      return res.status(404).json({ success: false, message: "Notice not found" });
    }
    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Update a Notice
export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, roles, date, priority } = req.body;

    if (!title || !description || !roles || !date || !priority) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { title, description, roles, date, priority },
      { new: true }
    );

    if (!updatedNotice) {
      return res.status(404).json({ success: false, message: "Notice not found" });
    }

    res.status(200).json({ success: true, message: "Notice updated successfully", data: updatedNotice });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// ✅ Delete a Notice
export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotice = await Notice.findByIdAndDelete(id);
    if (!deletedNotice) {
      return res.status(404).json({ success: false, message: "Notice not found" });
    }
    res.status(200).json({ success: true, message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// ✅ Post a Notice
export const postNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPosted } = req.body;

    const postedNotice = await Notice.findByIdAndUpdate(id, { isPosted }, { new: true });

    if (!postedNotice) {
      return res.status(404).json({ success: false, message: "Notice not found" });
    }

    res.status(200).json({ success: true, message: "Notice posted", data: postedNotice });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// ✅ Mark Notice as Read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notice = await Notice.findById(id);
    if (!notice) return res.status(404).json({ success: false, message: "Notice not found" });

    if (notice.readBy.includes(userId)) {
      return res.status(200).json({ success: true, message: "Already read" });
    }

    notice.readBy.push(userId);
    await notice.save();

    res.status(200).json({ success: true, message: "Notice marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
