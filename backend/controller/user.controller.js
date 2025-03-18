import { User } from "../model/user.model.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
dotenv.config();
export const createAccount = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      gender,
      role, 
      password,
    } = req.body;
    const photo=req.file.filename;

    if (!firstName || !email || !password) {
      return res.status(400).json({ error: true, message: "All fields required" });
    }
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ error: true, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      email,
      gender,
      role,
      photo,
      password: hashedPassword, 
    });

    await newUser.save();
    const accessToken = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10h" } 
    );

    return res.status(201).json({
      error: false,
      accessToken,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: true, message: "Please fill all fields" });
    }
    const userInfo = await User.findOne({ email });
    if (!userInfo) {
      return res.status(404).json({ error: true, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, userInfo.password);
    if (!isMatch) {
      return res.status(401).json({ error: true, message: "Invalid password" });
    }
    const accessToken = jwt.sign(
      { userId: userInfo._id, email: userInfo.email, role: userInfo.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" } 
    );

    res.status(200).json({
      error: false,
      userInfo,
      accessToken,
      message: "Login successful",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const {id}=req.params;
    const userInfo = await User.findOne({ _id: id });
    if (!userInfo) {
      return res.status(400).json({ message: "User does not exist" });
    }

    res.status(200).json({ user: userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
    try {
      const userInfo = await User.find({ role: { $ne: "admin" } });
  
      if (!userInfo) {
        return res.status(400).json({ message: "User does not exist" });
      }
  
      res.status(200).json({ user: userInfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const {  firstName,
        middleName,
        lastName,
        email,
        gender,
        role,
        } = req.body;
        const photo=req.file.filename;
  
      if (!firstName || !middleName || !email || !role || !gender) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const updateduser = await User.findByIdAndUpdate(
        id,
        {  firstName,
          middleName,
          lastName,
          email,
          gender,
          role,
          photo,},
        { new: true} 
      );
  
      if (!updateduser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ data: updateduser, message: "User information updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  
  export const updatePassword = async (req, res) => {
    try {
      const user = req.user; 
      const { oldPassword, newPassword, confirmPassword } = req.body;
  
      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Please confirm correctly!" });
      }
      const existingUser = await User.findById(user.userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect old password" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      existingUser.password = hashedPassword;
      await existingUser.save();
  
      res.status(200).json({ message: "Password updated successfully" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const activateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { isactivated } = req.body;
      if (isactivated === undefined) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const updateduser = await User.findByIdAndUpdate(
        id,
        { isactivated },
        { new: true }
      );
  
      if (!updateduser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ data: updateduser, message: "User activation status updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const ForgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ success: true, message: "If the email exists, a reset link will be sent." });
        }

        console.log(`Password reset requested for: ${email}`);

        // Ensure the secret is available
        if (! process.env.ACCESS_TOKEN_SECRET) {
            console.error("Access token secret is not defined.");
            return res.status(500).json({ success: false, message: "Internal server error." });
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3d" }
        );

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const resetUrl = `http://localhost:5173/reset-password/${user._id}/${accessToken}`;
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: user.email,
            subject: 'Reset Your Password',
            text: `Click the link below to reset your password:\n\n${resetUrl}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ success: false, message: "Error sending email. Please try again later." });
            }
            console.log(`Password reset email sent: ${info.response}`);
            res.status(200).json({ success: true, message: "Password reset link sent to your email." });
        });

    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
    }
};
  export const ResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
     console.log("id of :",id);
     console.log("token :",token);
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (decoded.userId !== id) {
        return res.status(400).json({ success: false, message: "Invalid token or user ID mismatch." });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      res.status(200).json({ success: true, message: "Password reset successfully." });
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(400).json({ success: false, message: "Invalid token." });
      }
  
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  };