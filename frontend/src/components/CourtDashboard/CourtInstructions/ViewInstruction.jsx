import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toastimp
import ConfirmModal from "@/components/Modals/ConfirmModal";

const ViewInstruction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [instruction, setInstruction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const [openDelete, setOpenDelete] = useState(false);
   const [openActivate, setOpenActivate] = useState(false);

  const deleteInstruct = async () => {
    try {
      
        const deletedInstruct = await axiosInstance.delete(
          `/instruction/delete/${id}`
        );
        if (deletedInstruct) {
          toast.success("Instruction deleted successfully!");
          setOpenDelete(false)
          navigate("/court-dashboard/list"); // Ensure you redirect to the correct page
        
      }
    } catch (error) {
      setError(error.response?.data?.error || "Error deleting Instruction");
    }
  };
  console.log(instruction);
  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await axiosInstance.get(
          `/instruction/get-instruct/${id}`
        );

        if (response.data && response.data.instruction) {
          setInstruction(response.data.instruction);
        } else {
          setError("Instruction details not found.");
        }
      } catch (error) {
        console.error("Error fetching incident details:", error);
        setError(
          error.response?.data?.error ||
            "An error occurred while fetching incident details."
        );
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
    return (
      <div className="text-center text-red-600 font-semibold">{error}</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <TiArrowBack
        size={50}
        onClick={() => navigate(-1)}
        className="cursor-pointer"
      />
      <h2 className="text-2xl font-bold mb-6 text-center">
        Instruction Details
      </h2>

      {instruction ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-lg font-bold">Case Number :</p>
              <p className="text-lg font-medium">
                {instruction.courtCaseNumber}
              </p>
            </div>

            <div>
              <p className="text-lg font-bold">Prison Name:</p>
              <p className="text-lg font-medium">{instruction.prisonName}</p>
            </div>

            <div>
              <p className="text-lg font-bold">Judge Name:</p>
              <p className="text-lg font-medium">{instruction.inmate}</p>
            </div>

            <div>
              <p className="text-lg font-bold">Verdict:</p>
              <p className="text-lg font-medium">{instruction.verdict}</p>
            </div>

            <div>
              <p className="text-lg font-bold">Instructions:</p>
              <p className="text-lg font-medium">{instruction.instructions}</p>
            </div>

            <div>
              <p className="text-lg font-bold">Hearing Date:</p>
              <p className={`text-lg font-medium `}>
                {instruction.hearingDate}
              </p>
            </div>

            <div>
              <p className="text-lg font-bold">Attachment:</p>
              <img
                src={`https://localhost:4000/uploads/${instruction.attachment}`}
                alt="Attachment"
              />
            </div>
            <div>
              <p className="text-lg font-bold">Signature:</p>
              <img
                src={`https://localhost:4000/uploads/${instruction.signature}`}
                alt="Attachment"
              />
            </div>

            <div className="col-span-2 mt-6">
              <p className="text-lg font-bold">Effective Date:</p>
              <p className="text-lg font-medium">{instruction.effectiveDate}</p>
            </div>
            <div className="col-span-2 mt-6">
              <p className="text-lg font-bold">Send Date:</p>
              <p className="text-lg font-medium">{instruction.sendDate}</p>
            </div>
          </div>

          <div className="flex space-x-5 mt-6">
            <button className="bg-blue-600 text-white py-2 px-3 rounded font-semibold w-[70px]">
              Send
            </button>
            {/* <ConfirmModal
              open={openActivate}
              setOpen={setOpenActivate}
              onDelete={toggleActivation}
              message={`Do you want to ${user.isactivated ? "deactivate" : "activate"} this user account?`}
            /> */}
            <button
              className="bg-red-600 text-white py-2 px-3 rounded font-semibold w-[70px]"
              onClick={()=>setOpenDelete(true)}
            >
              Delete
            </button>
            <ConfirmModal
              open={openDelete}
              setOpen={setOpenDelete}
              onDelete={deleteInstruct}
              message="Do you really want to delete this Instruction? This action cannot be undone."
            />
          </div>
        </>
      ) : (
        <div className="text-center text-red-600 font-semibold">
          Incident not found.
        </div>
      )}
    </div>
  );
};

export default ViewInstruction;
