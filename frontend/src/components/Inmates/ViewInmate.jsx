import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { TiArrowBack } from "react-icons/ti";
import ConfirmModal from "../Modals/ConfirmModal";

const ViewInmate = () => {
  const { id } = useParams();
  const [inmateData, setInmateData] = useState(null);
  const [loading, setLoading] = useState(true);
   const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchInmateDetails = async () => {
      try {
        const response = await axiosInstance.get(`/inmates/get-inmate/${id}`);
       
        setInmateData(response.data.inmate);
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


   const handleDelete = async (id) => {
    
  
      try {
        const response = await axiosInstance.delete(
          `/inmate/delete-inmate/${id}`, // Updated API endpoint for inmate
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        if (response.data) {
          toast.success("Inmate record deleted successfully.");
          onDelete();
          setOpenDelete(false)
          navigate("/securityStaff-dashboard/inmates");
          
        } else {
          toast.error("Failed to delete the inmate record.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response?.data?.error || "Error deleting the inmate record.");
      }
    };
  


  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
       <TiArrowBack size={50} onClick={()=>navigate(-1)} className="cursor-pointer"/>
      <h2 className="text-3xl font-bold mb-6 text-center">Inmate Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-xl font-semibold">Full Name:</h3>
          <p>{inmateData.fullName}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Age:</h3>
          <p>{inmateData.age}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Birth Date:</h3>
          <p>{inmateData.birthDate}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Mother's Name:</h3>
          <p>{inmateData.motherName}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Gender:</h3>
          <p>{inmateData.gender}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Birth Region:</h3>
          <p>{inmateData.birthRegion}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Current Region:</h3>
          <p>{inmateData.currentRegion}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Birth Zone:</h3>
          <p>{inmateData.birthZone}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Birth Wereda:</h3>
          <p>{inmateData.birthWereda}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold"> Birth Kebele:</h3>
          <p>{inmateData. birthKebele}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Current Zone:</h3>
          <p>{inmateData.currentZone}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Current Wereda:</h3>
          <p>{inmateData.currentWereda}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Current Kebele:</h3>
          <p>{inmateData.currentKebele}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Degree Level:</h3>
          <p>{inmateData.degreeLevel}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Work:</h3>
          <p>{inmateData.work}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold"> Nationality:</h3>
          <p>{inmateData.nationality}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold"> religion: </h3>
          <p>{inmateData.religion }</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">maritalStatus:</h3>
          <p>{inmateData.maritalStatus}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Height:</h3>
          <p>{inmateData.height}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">hairType:</h3>
          <p>{inmateData.hairType}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold"> face:</h3>
          <p>{inmateData.face}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">foreHead:</h3>
          <p>{inmateData.foreHead}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold"> Eye Color: </h3>
          <p>{inmateData.eyeColor}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">  Teeth:  </h3>
          <p>{inmateData.teeth}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold"> Ear: </h3>
          <p>{inmateData.ear}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">nose:</h3>
          <p>{inmateData.nose}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Special Symbol:</h3>
          <p>{inmateData.specialSymbol}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Contact Name:</h3>
          <p>{inmateData.contactName}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Contact Region: </h3>
          <p>{inmateData.contactRegion}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Contact Zone:</h3>
          <p>{inmateData.contactZone}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Contact Wereda: </h3>
          <p>{inmateData.contactWereda}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Contact Kebele:</h3>
          <p>{inmateData.contactKebele}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold"> phoneNumber:</h3>
          <p>{inmateData. phoneNumber}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Registrar Worker Name</h3>
          <p>{inmateData.registrarWorkerName}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Case Type:</h3>
          <p>{inmateData.caseType}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Parole Date:</h3>
          <p>{inmateData.paroleDate}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold"> Release Reason:</h3>
          <p>{inmateData.releaseReason}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Released Date:</h3>
          <p>{inmateData.releasedDate}</p>
        </div>
 
        {/* Add more fields as necessary */}
      </div>

      <div className="mt-6">
        <button
        onClick={() => navigate(`/securityStaff-dashboard/update-inmate/${id}`)}
        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Edit Inmate
        </button>
        <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
        onClick={() => setOpenDelete(true)}
      >
        Delete
      </button>
        <ConfirmModal
                    open={openDelete}
                    setOpen={setOpenDelete}
                    onDelete={() => handleDelete(id)}
                    message="Do you really want to delete this Inmate? This action cannot be undone."
                  />
      </div>
    </div>
  );
};

export default ViewInmate;


