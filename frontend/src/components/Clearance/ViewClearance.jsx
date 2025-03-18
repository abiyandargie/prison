import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { TiArrowBack } from "react-icons/ti";
import { toast } from 'react-toastify'; 

function ViewClearance() {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      date: new Date().toISOString().substring(0, 10),
      reason: "",
      remark: "",
      inmate: "", 
      sign: "",
    });

    useEffect(() => {
        const fetchInmateDetails = async () => {
          try {
            const response = await axiosInstance.get(`/clearance/get-clearance/${id}`);
            if (response.data) {
                const clearance=response.data.clearance;
              setFormData({
                date:clearance.date,
                reason:clearance.reason,
                remark:clearance.remark,
                inmate:clearance.inmate, 
                sign: clearance.sign,
    
              });
            }
          } catch (error) {
            console.error("Error fetching inmate details:", error);
          }
        };
    
        if (id) {
          fetchInmateDetails();
        }
      }, [id]);

      const deleteClearance = async () => {
        try {
          const confirm = window.confirm("Are you sure you want to delete this Clearance ?");
          if (confirm) {
            const deletedClearance = await axiosInstance.delete(`/clearance/delete-clearance/${id}`);
            if (deletedClearance) {
              toast.success("clearance deleted successfully!");
              navigate("/securityStaff-dashboard/clearance");  // Ensure you redirect to the correct page
            }
          }
        } catch (error) {
          setError(error.response?.data?.error || "Error deleting Instruction");
        }
      };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
         <TiArrowBack size={50} onClick={() => navigate(-1)} className="cursor-pointer" />
         <h2 className="text-2xl font-bold mb-6 text-center">Clearance Details</h2>
   
         {formData ? (
           <>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <p className="text-lg font-bold">Date:</p>
                 <p className="text-lg font-medium">{formData.date}</p>
               </div>
   
               <div>
                 <p className="text-lg font-bold">Inmate:</p>
                 <p className="text-lg font-medium">{formData.inmate}</p>
               </div>
               
           
              
               <div>
                 <p className="text-lg font-bold">Reason:</p>
                 <p className="text-lg font-medium">{formData.reason}</p>
               </div>
   
               <div>
                 <p className="text-lg font-bold">Remark:</p>
                 <p className="text-lg font-medium">
                   {formData.remark}
                 </p>
               </div>
   
               <div>
                 <p className="text-lg font-bold">Sign:</p>
                 <img src={`https://localhost:4000/uploads/${formData.sign}`} alt="Sign" />
               </div>
   
              
             </div>
   
             <div className="flex space-x-5 mt-6">
             
               <button
                 className="bg-red-600 text-white py-2 px-3 rounded font-semibold w-[70px]"
                 onClick={deleteClearance}
               >
                 Delete
               </button>
             </div>
           </>
         ) : (
           <div className="text-center text-red-600 font-semibold">Clearance not found.</div>
         )}
       </div>
  )
}

export default ViewClearance