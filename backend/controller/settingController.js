
import { User } from '../model/user.model.js';
import bcrypt from "bcrypt";
import mongoose from 'mongoose';

const changePassword = async (req, res) => {
  try {
    console.log("Received changePassword request:", req.body); // Debug log

    const { userId, oldPassword, newPassword } = req.body;

    // Validate required fields
    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Validate the old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: "Wrong old password" });
    }

    // Ensure the new password is different from the old password
    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        error: "New password must be different from the old password",
      });
    }

    // Validate the new password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: "New password must be at least 6 characters long",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    // Send a success response
    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in changePassword:", error); // Log backend errors
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export { changePassword };

 

 



 
