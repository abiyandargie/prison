import express from "express";
import {
  getMessages,
  addMessage,
  updateMessage,
  deleteMessage,
  getSidemMessage,
} from "../controller/homepage.controller.js";

export const MessageRoutes = express.Router();

MessageRoutes.get("/get-messages", getMessages);
MessageRoutes.post("/add-messages", addMessage);
MessageRoutes.put("/update-messages/:id", updateMessage);
MessageRoutes.delete("/delete-messages/:id", deleteMessage);
MessageRoutes.delete("/get-side-images", getSidemMessage);

