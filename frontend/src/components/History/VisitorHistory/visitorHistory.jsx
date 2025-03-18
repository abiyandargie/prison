import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const VisitorHistoryView = () => {
  const { id } = useParams(); // Get visitor ID from URL
  const [visitor, setVisitor] = useState(null);

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const response = await axios.get(
          `https://loclahost/api/visitor/${id}`,//to get the visitor based on id  
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setVisitor(response.data.visitor);
        } else {
          alert("Failed to fetch visitor details");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(
          error.response?.data?.error ||
            "An error occurred while fetching visitor details"
        );
      }
    };

    fetchVisitor();
  }, [id]);

  return (
    <>
      {visitor ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Visitor History Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visitor Details */}
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Full Name:</p>
                <p className="text-lg font-medium">
                  {visitor.firstName} {visitor.middleName} {visitor.lastName}
                </p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Visitor ID:</p>
                <p className="text-lg font-medium">{visitor.visitorId}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Relation to Inmate:</p>
                <p className="text-lg font-medium">{visitor.relation}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Purpose of Visit:</p>
                <p className="text-lg font-medium">{visitor.purpose}</p>
              </div>
            </div>

            {/* Inmate Details */}
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Inmate Visited:</p>
                <p className="text-lg font-medium">{visitor.inmate}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Visit Date:</p>
                <p className="text-lg font-medium">
                  {new Date(visitor.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Phone Number:</p>
                <p className="text-lg font-medium">{visitor.phone}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-12 text-xl">Loading...</div>
      )}
    </>
  );
};

export default VisitorHistoryView;
