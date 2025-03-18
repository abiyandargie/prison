import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, TransferButtons } from "../../utils/TransferHelper";
import axiosInstance from "../../utils/axiosInstance";

const TransferList = () => {
  const [inmates, setInmates] = useState([]);
  const [filteredInmates, setFilteredInmates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/transfer/getall-transfers");
        if (response.data && response.data.transfers) {
          let un=1;
          const data = response.data.transfers.map((transfer, index) => ({
            U_no:un++, // Using index + 1 instead of an external variable
            _id: transfer._id,
            firstName: transfer.firstName,
            middleName: transfer.middleName,
            fromPrison: transfer.fromPrison,
            toPrison: transfer.toPrison,
            status: transfer.status,
            action: <TransferButtons _id={transfer._id} />,
          }));

          setInmates(data);
          setFilteredInmates(data);
        } else {
          console.error("Unexpected data format:", response.data.transfers);
          setInmates([]);
        }
      } catch (error) {
        console.error("Error fetching inmates:", error);
        alert(error.response?.data?.error || "Failed to load users.");
        setInmates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = inmates.filter(
      (transfer) =>
        transfer.firstName.toLowerCase().includes(query) ||
        transfer.middleName.toLowerCase().includes(query)
    );
    setFilteredInmates(filtered);
  };

  return (
    <div className="p-6 mt-12">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Transfers</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Search by first or middle name"
          className="px-4 py-2 border rounded-md"
        />
        <Link
          to="/woreda-dashboard/add"
          className="px-4 py-2 bg-teal-600 text-white rounded-md"
        >
          Add New Transfer
        </Link>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow-md">
        <DataTable
          columns={columns}
          data={filteredInmates} // Fixed this line
          pagination
          progressPending={loading}
          progressComponent={<p className="text-center">Loading...</p>}
        />
      </div>
    </div>
  );
};

export default TransferList;
