import axiosInstance from "../../utils/axiosInstance";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import ConfirmModal from "../Modals/ConfirmModal";
const ViewVisitor = () => {
  const navigate=useNavigate();
  const { id } = useParams();
  const [visitor, setVisitor] = useState(null);
 const [error, setError] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const deleteVisitor=async()=>{
    try {
      const confirm=window.confirm("Are you sure to delete this Visitor ?")
      if(confirm){
        const deletedVisitor=await axiosInstance.delete(`/visitor/delete-visitor/${id}`);
        if(deletedVisitor){
          toast.success("Visitor deleted successfully!")
          navigate("/policeOfficer-dashboard/visitors");
        }
      }
      

    } catch (error) {
      setError(error.response?.data?.error || "Error to delete Visitor");
    }
    

   }

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const response = await axiosInstance.get(
          `/visitor/get-visitor/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data) {
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
         <TiArrowBack size={50} onClick={()=>navigate(-1)} className="cursor-pointer"/>
          <h2 className="text-2xl font-bold mb-8 text-center">Visitor Details</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
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
                <p className="text-lg font-bold">Phone:</p>
                <p className="text-lg font-medium">{visitor.phone}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Inmate Name:</p>
                <p className="text-lg font-medium">{visitor.inmate}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Relationship:</p>
                <p className="text-lg font-medium">{visitor.relation}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Purpose of Visit:</p>
                <p className="text-lg font-medium">{visitor.purpose}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Visit Date:</p>
                <p className="text-lg font-medium">{new Date(visitor.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <button className="bg-red-600 text-white py-2  px-3 rounded font-semibold w-[70px]" onClick={()=>setOpenDelete(true)}>delete</button>
          <ConfirmModal
            open={openDelete}
            setOpen={setOpenDelete}
            onDelete={deleteVisitor}
            message="Do you really want to delete this Visitor? This action cannot be undone."
          />
          <button className="bg-yellow-600 text-white py-2  px-3 rounded font-semibold w-[70px] ml-5" >Restrict</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ViewVisitor;
