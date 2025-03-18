import React from "react";
import { motion } from "framer-motion";

const NoticeCard = ({ title, description, priority, date }) => {
  return (
    <motion.div
      className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-sm text-gray-500">Priority: {priority}</p>
      <p className="text-sm text-gray-500">Date: {new Date(date).toLocaleDateString()}</p>
    </motion.div>
  );
};

export default NoticeCard;
