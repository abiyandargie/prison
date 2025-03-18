import React from "react";

const ViewVisitorModal = ({ open, setOpen, visitor }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Visitor Details</h3>

        {/* Grid layout for visitor info */}
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">First Name</label>
              <p className="text-lg text-gray-800">{visitor.firstName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Middle Name</label>
              <p className="text-lg text-gray-800">{visitor.middleName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Last Name</label>
              <p className="text-lg text-gray-800">{visitor.lastName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Relation</label>
              <p className="text-lg text-gray-800">{visitor.relation}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Purpose</label>
              <p className="text-lg text-gray-800">{visitor.purpose}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Phone</label>
              <p className="text-lg text-gray-800">{visitor.phone}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Date</label>
            <p className="text-lg text-gray-800">{visitor.date ? new Date(visitor.date).toISOString().split('T')[0] : ""}</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => setOpen(false)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewVisitorModal;
