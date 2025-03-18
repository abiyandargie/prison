import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';  // Import toast
import ConfirmModal from "../Modals/ConfirmModal";
const ViewIncident = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const [openDelete, setOpenDelete] = useState(false);

  const deleteIncident = async () => {
    try {
     
        const deletedIncident = await axiosInstance.delete(`/incidents/delete-incident/${id}`);
        if (deletedIncident) {
          toast.success("Incident deleted successfully!");
          setOpenDelete(false)
          navigate("/admin-dashboard/incidents");  // Ensure you redirect to the correct page
        }
      
    } catch (error) {
      setError(error.response?.data?.error || "Error deleting incident");
    }
  };

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await axiosInstance.get(`/incidents/get-incident/${id}`);
        if (response.data && Array.isArray(response.data.incidents) && response.data.incidents.length > 0) {
          setIncident(response.data.incidents[0]);
        } else {
          setError("Incident details not found.");
        }
      } catch (error) {
        console.error("Error fetching incident details:", error);
        setError(error.response?.data?.error || "An error occurred while fetching incident details.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <TiArrowBack size={50} onClick={() => navigate(-1)} className="cursor-pointer" />
      <h2 className="text-2xl font-bold mb-6 text-center">Incident Details</h2>

      {incident ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-lg font-bold">Incident ID:</p>
              <p className="text-lg font-medium">{incident.incidentId}</p>
            </div>

            <div>
              <p className="text-lg font-bold">Reporter Name:</p>
              <p className="text-lg font-medium">{incident.reporter}</p>
            </div>

            <div>
              <p className="text-lg font-bold">Inmate:</p>
              <p className="text-lg font-medium">{incident.inmate}</p>
            </div>

            <div>
              <p className="text-lg font-bold">Date of Incident:</p>
              <p className="text-lg font-medium">
                {new Date(incident.incidentDate).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-lg font-bold">Incident Type:</p>
              <p className="text-lg font-medium">{incident.incidentType}</p>
            </div>

            <div>
              <p className="text-lg font-bold">Status:</p>
              <p className={`text-lg font-medium ${incident.status === "Resolved" ? "text-green-600" : "text-red-600"}`}>
                {incident.status}
              </p>
            </div>

            {incident.attachment && (
              <div>
                <p className="text-lg font-bold">Attachment:</p>
                <img src={`https://localhost:4000/uploads/${incident.attachment}`} alt="Attachment" />
              </div>
            )}

            <div className="col-span-2 mt-6">
              <p className="text-lg font-bold">Description:</p>
              <p className="text-lg font-medium">{incident.description}</p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="bg-red-600 text-white py-2 px-3 rounded font-semibold w-[70px]"
              onClick={()=>setOpenDelete(true)}
            >
              Delete
            </button>
               <ConfirmModal
                        open={openDelete}
                        setOpen={setOpenDelete}
                        onDelete={deleteIncident}
                        message="Do you really want to delete this Incident? This action cannot be undone."
                      />
          </div>
        </>
      ) : (
        <div className="text-center text-red-600 font-semibold">Incident not found.</div>
      )}
    </div>
  );
};

export default ViewIncident;
