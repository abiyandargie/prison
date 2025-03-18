// import express from "express";
// import { authenticateToken } from "../utilities.js";
// import { addNotice, getNotice,getAllNotices,postNotice,updateNotice ,deleteNotice} from "../controller/notice.controller.js";
// export const noticeRouter = express.Router();
// noticeRouter.post("/add-notice", authenticateToken, addNotice);
// noticeRouter.get("/getAllNotices", authenticateToken, getAllNotices);
// noticeRouter.get("/get-notice/:id", authenticateToken, getNotice);
// noticeRouter.put("/update-notice/:id", authenticateToken, updateNotice);
// noticeRouter.put("/post-notice/:id", authenticateToken, postNotice);
// noticeRouter.delete("/delete-notice/:id", authenticateToken, deleteNotice);
import express from "express";
import { authenticateToken } from "../utilities.js";
import {
  addNotice,
  getNotice,
  getAllNotices,
  postNotice,
  updateNotice,
  deleteNotice,
  markAsRead,
} from "../controller/notice.controller.js";

export const noticeRouter = express.Router();

// CRUD Routes for Notices
noticeRouter.post("/add-notice", authenticateToken, addNotice);
noticeRouter.get("/getAllNotices", authenticateToken, getAllNotices);
noticeRouter.get("/get-notice/:id", authenticateToken, getNotice);
noticeRouter.put("/update-notice/:id", authenticateToken, updateNotice);
noticeRouter.put("/post-notice/:id", authenticateToken, postNotice);
noticeRouter.delete("/delete-notice/:id", authenticateToken, deleteNotice);

// New Route: Mark Notice as Read
noticeRouter.patch("/mark-as-read/:id", authenticateToken, markAsRead);
