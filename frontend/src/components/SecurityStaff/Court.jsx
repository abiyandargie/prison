import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, UserButtons } from "../../utils/CourtHelper";
import axiosInstance from "@/utils/axiosInstance";

const InstructionList = () => {
  const [instructions, setInstructions] = useState([]);
  const [filteredInstructions, setFilteredInstructions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/instruction/allInstruction");
        console.log(response);
        if (response.data && response.data.instructions) {
          let Uno=1;
         
          const data = response.data.instructions.map((instuct, index) => ({
            U_no:Uno++,
            _id: instuct._id,
            courtCaseNumber: instuct.courtCaseNumber,
            prisonName:instuct.prisonName,
            judgeName: instuct.judgeName,
            verdict: instuct.verdict,
            instructions: instuct.instructions,
            hearingDate: instuct.hearingDate,
            effectiveDate: instuct.effectiveDate,
            sendDate:instuct.sendDate ,
            action: <UserButtons _id={instuct._id} />,
          }));

          setInstructions(data);
          setFilteredInstructions(data);
        } else {
          console.error("Unexpected data format:", response.data.instructions);
          setInstructions([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        alert(error.response?.data?.error || "Failed to load users.");
        setInstructions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = instructions.filter(
      (instruct) =>
        instruct.courtCaseNumber.toLowerCase().includes(query) ||
      instruct.prisonName.toLowerCase().includes(query) 
    
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="p-6 mt-12 ml-20">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Inmate From Court</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Search by first, middle, or last name"
          className="px-4 py-2 border rounded-md"
        />
        <div className="space-x-3">
          <button
            className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            onClick={() => setFilteredLeaves(leaves)} // Reset to all
          >
            All
          </button>
          <button
            className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            onClick={() => filterByButton("Pending")}
          >
            Pending
          </button>
          <button
            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={() => filterByButton("Active")}
          >
            Active
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => filterByButton("Revoked")}
          >
            Revoked
          </button>
        </div>
       
      </div>
        
      <div className="mt-6 bg-white p-4 rounded shadow-md">
        <DataTable
          columns={columns}
          data={filteredInstructions}
          pagination
          progressPending={loading}
          progressComponent={<p className="text-center">Loading...</p>}
        />
      </div>
    </div>
  );
};

export default InstructionList;
