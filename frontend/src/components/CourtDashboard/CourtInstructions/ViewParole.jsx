import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { toast } from 'react-toastify';
import ParoleRejectModal from "./ParoleRejectModal";
import ConfirmModal from "@/components/Modals/ConfirmModal";

const ViewParole = () => {
  const { id } = useParams();
  const [inmateData, setInmateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false); // Manage modal state
  const [openAccept, setOpenAccept] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInmateDetails = async () => {
      try {
        const response = await axiosInstance.get(`/inmates/get-inmate/${id}`);
        setInmateData(response.data.inmate);
      } catch (error) {
        console.error("Error fetching inmate details:", error);
        toast.error("Failed to load inmate details.");
      } finally {
        setLoading(false);
      }
    };

    fetchInmateDetails();
  }, [id]);

  const handleRejectParole = async ({ reason, date }) => {
    try {
      await axiosInstance.post(`/parole/reject/${id}`, { reason, date });
      toast.success("Parole request rejected successfully.");
    } catch (error) {
      toast.error("Failed to reject parole request.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!inmateData) {
    return <div>No data available</div>;
  }

  const acceptParole=()=>{
    return
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <TiArrowBack size={50} onClick={() => navigate(-1)} className="cursor-pointer"/>
      <h2 className="text-3xl font-bold mb-6 text-center">Parole Request Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-xl font-semibold">Full Name:</h3>
          <p>{inmateData.fullName}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Age:</h3>
          <p>{inmateData.age}</p>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setOpenAccept(true)} 
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Accept
        </button>
          <ConfirmModal
                            open={openAccept}
                            setOpen={setOpenAccept}
                            onDelete={acceptParole}
                            message="Do you really want to Accept this Parol?"
                          />
        <button 
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsRejectModalOpen(true)}
        >
          Reject
        </button>
      </div>

      {/* Parole Rejection Modal */}
      <ParoleRejectModal 
        isOpen={isRejectModalOpen} 
        onClose={() => setIsRejectModalOpen(false)} 
        onSubmit={handleRejectParole} 
      />
    </div>
  );
};

export default ViewParole;
