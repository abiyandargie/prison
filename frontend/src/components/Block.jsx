import React from "react";
import { useNavigate } from "react-router-dom";

const Block = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-4">
          Your Account is Restricted
        </h2>
        <p className="text-gray-600 mb-6">
          Please contact the technician for assistance.
        </p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          onClick={() => navigate("/login")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Block;
