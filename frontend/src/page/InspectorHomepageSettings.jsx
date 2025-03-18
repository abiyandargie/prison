import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaSearch } from "react-icons/fa"; // Import icons
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InspectorHomepageSettings = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]); // For filtered messages
  const [newMessage, setNewMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null); // Track which message is being edited
  const [editingText, setEditingText] = useState(""); // Track the text being edited
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // For add modal
  const [searchQuery, setSearchQuery] = useState(""); // For search/filter
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [selectedImage, setSelectedImage] = useState(null);


  // Fetch messages
  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get("/managemessages/get-messages");
      setMessages(response.data.messages);
      setFilteredMessages(response.data.messages); // Initialize filtered messages
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Failed to fetch messages. Please try again."); // Confirmation message
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter messages based on search query
  useEffect(() => {
    const filtered = messages.filter((msg) =>
      msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [searchQuery, messages]);

  // Add a new message
  const addMessage = async () => {
    if (!newMessage.trim()) {
      alert("Message cannot be empty."); // Validation message
      return;
    }

    const formData = new FormData();
    formData.append("text", newMessage);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await axiosInstance.post("/managemessages/add-messages", { text: newMessage });
      setNewMessage("");
      setIsAddModalOpen(false); // Close the modal
      fetchMessages(); // Refresh the list
      toast.success("Message added successfully");
    } catch (error) {
      console.error("Error adding message:", error);
      toast.error("Failed to add message. Please try again."); 
    }
  };

  // Delete a message
  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?"); // Confirmation dialog
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/managemessages/delete-messages/${id}`);
      fetchMessages(); // Refresh the list
      toast.success("Message deletting successfully!");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delte message. Please try again.");
       
    }
  };

  // Update a message
  const updateMessage = async (id) => {
    if (!editingText.trim()) {
      alert("Message cannot be empty."); // Validation message
      return;
    }
    try {
      await axiosInstance.put(`/managemessages/update-messages/${id}`, { text: editingText });
      setEditingMessageId(null); // Exit edit mode
      setEditingText(""); // Clear the editing text
      fetchMessages(); // Refresh the list
      toast.success("Message Updated Successfully"); 
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error('Failed to Update message. Please try again')
    }
  };

  // Enter edit mode for a message
  const startEditing = (id, text) => {
    setEditingMessageId(id);
    setEditingText(text);
  };

  // Cancel edit mode
  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditingText("");
  };
 // handle image 
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  

  return (
    <div className="p-5 transition-all duration-300">
      {/* Header Section */}
      <div
        className={`bg-white shadow-md p-4 fixed top-14 z-20 flex flex-wrap items-center justify-between transition-all duration-300 ml-2 gap-2 ${isCollapsed ? "left-16 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-17rem)]"
          }`}
      >
        <button
          className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 mr-6 py-2 rounded-lg shadow-md transition duration-300"
          onClick={() => window.history.back()}
        >
          <FaArrowLeft className="mr-2 text-lg" /> Back
        </button>
        <h3 className="text-2xl font-bold text-gray-800 hidden text-center sm:block">
          Manage Homepage Messages
        </h3>

        <div className="flex-1" />
        <div className="relative flex items-center w-60 md:w-1/3">
          <FaSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search messages"
            className="h-10 px-4 py-2 border border-gray-300 rounded-md w-1/3 md:w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="h-10 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center justify-center min-w-[150px] md:w-auto"
        >
          Add New Message
        </button>
      </div>

      {/* Main Content */}
      <div className={`mt-32 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"}`}>
        {/* List Messages */}
        <ul className="space-y-2">
          {filteredMessages.map((msg) => (
            <li key={msg._id} className="p-2 bg-gray-200 flex justify-between items-center rounded">
              {editingMessageId === msg._id ? (
                // Edit Mode
                <div className="flex flex-col md:flex-row md:items-center gap-2 w-full">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateMessage(msg._id)}
                      className="h-10 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center min-w-[150px] md:w-auto"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-500 text-white p-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <span>{msg.text}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(msg._id, msg.text)}
                      className="h-10 bg-orange-300 hover:bg-orange-400 text-white px-4 py-2 rounded-md flex items-center justify-center min-w-[100px] md:w-auto hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="h-10 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center min-w-[100px] md:w-autohover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Add Message Modal */}
      {isAddModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
      <h2 className="text-xl font-bold mb-4">Add New Message</h2>

      {/* Message Input */}
      <input
        type="text"
        placeholder="Enter new message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Image Upload Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Image Preview */}
      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Preview"
          className="w-full h-40 object-cover rounded mb-4"
        />
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsAddModalOpen(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={addMessage}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default InspectorHomepageSettings;