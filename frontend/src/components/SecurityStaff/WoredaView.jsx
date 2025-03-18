import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { TiArrowBack } from "react-icons/ti";

const WoredaView = () => {
  const { id } = useParams();
  const [inmateData, setInmateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchInmateDetails = async () => {
      try {
        const response = await axiosInstance.get(`/transfer/get-transfer/${id}`);
       
        setInmateData(response.data.transfer);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inmate details:", error);
        toast.error("Failed to load inmate details.");
        setLoading(false);
      }
    };

    fetchInmateDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!inmateData) {
    return <div>No data available</div>;
  }

  const deleteTransfer = async () => {
    if (window.confirm("Are you sure you want to delete this inmate?")) {
      try {
        await axiosInstance.delete(`/transfer/delete-transfer/${id}`);
        toast.success("Inmate deleted successfully!");
        navigate("/woreda-dashboard/inmates");
      } catch (error) {
        toast.error(error.response?.data?.error || "Error deleting Transfer");
      }
    }
  };
  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
       <TiArrowBack size={50} onClick={()=>navigate(-1)} className="cursor-pointer"/>
      <h2 className="text-3xl font-bold mb-6 text-center">Inmate from Woreda Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    
        <div>
          <h3 className="text-xl font-semibold">Full Name:</h3>
          <p>{inmateData.firstName} {inmateData.middleName} {inmateData.lastName}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Age:</h3>
          <p>{inmateData.age}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Birth Date:</h3>
          <p>{new Date(inmateData.dateOfBirth).toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Crime:</h3>
          <p>{inmateData.crime}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Gender:</h3>
          <p>{inmateData.gender}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">sentence Start:</h3>
          <p>{ new Date(inmateData.sentenceStartnew).toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">sentence End:</h3>
          <p>{ new Date(inmateData.sentenceEnd).toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">from Prison:</h3>
          <p>{inmateData.fromPrison}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">to Prison:</h3>
          <p>{inmateData.toPrison}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">  reason:</h3>
          <p>{inmateData.reason}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">status:</h3>
          <p>{inmateData.status}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">transfer Date:</h3>
          <p>{ new Date(inmateData.transferDate).toLocaleDateString()}</p>
        </div>
        </div>
      <div className="mt-6">
        <button
          onClick={() => navigate(`/inmates/update/${id}`)} 
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
         Add to Inmate
        </button>
       
      </div>
    </div>
  );
};

export default WoredaView;


