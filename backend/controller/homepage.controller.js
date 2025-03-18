import { image } from "framer-motion/client";
import { HomepageMessage } from "../model/homepage.model.js";

// Get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await HomepageMessage.find().sort({ createdAt: -1, image: -1 });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const getSidemMessage = async(req,res) =>{
  try {
    const messages = await HomepageMessage.find().sort({ createdAt: -1, text: -1 });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
}


// Add a new message
export const addMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const newMessage = new HomepageMessage({ text, image});
    await newMessage.save();
    res.status(201).json({ message: "Message added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add message" });
  }
};

// Update a message
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, image } = req.body;
    await HomepageMessage.findByIdAndUpdate(id, { text });
    res.status(200).json({ message: "Message updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update message" });
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await HomepageMessage.findByIdAndDelete(id);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};
