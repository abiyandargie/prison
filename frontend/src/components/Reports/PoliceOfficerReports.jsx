import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux"; // To access the sidebar state

const PoliceOfficerReports = () => {
  const [visitors, setVisitors] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [selectedReport, setSelectedReport] = useState("visitors");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed); // Get sidebar state

  useEffect(() => {
    axiosInstance.get("/visitor/allVisitors").then((res) => setVisitors(res.data.visitors));
    axiosInstance.get("/incidents/allIncidents").then((res) => setIncidents(res.data.incidents));
  }, []);

  useEffect(() => {
    // Trigger filter when the selected report or date range changes
    if (selectedReport === "visitors") {
      filterVisitors();
    } else if (selectedReport === "incidents") {
      filterIncidents();
    }
  }, [selectedReport, startDate, endDate]);

  const filterVisitors = () => {
    if (!startDate || !endDate) return;
    let vn0 = 1;
    const filtered = visitors
      .map((visitor) => {
        vn0++;
        return {
          vn0,
          ...visitor,
        };
      })
      .filter((visitor) => {
        const visitDate = new Date(visitor.date);
        return visitDate >= new Date(startDate) && visitDate <= new Date(endDate);
      });
    setFilteredData(filtered);
  };

  const filterIncidents = (status = null) => {
    let In0 = 1;
    if (!startDate || !endDate) return;
    const filtered = incidents
      .map((incident) => ({
        I_No: In0++,
        ...incident,
      }))
      .filter((incident) => {
        const reportDate = new Date(incident.incidentDate);
        return (
          reportDate >= new Date(startDate) &&
          reportDate <= new Date(endDate) &&
          (!status || incident.status === status)
        );
      });
    setFilteredData(filtered);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Police Officer ${selectedReport === "visitors" ? "Visitor" : "Incident"} Report`, 14, 10);

    const tableColumn =
      selectedReport === "visitors"
        ? ["First Name", "Last Name", "Phone", "Relation", "Date"]
        : ["Reporter", "Type", "Status", "Date"];
    let vn0 = 1;
    const tableRows = filteredData.map((item) =>
      selectedReport === "visitors"
        ? [vn0++, item.firstName, item.lastName, item.phone, item.relation, new Date(item.date).toLocaleDateString()]
        : [vn0++, item.reporter, item.incidentType, item.status, new Date(item.incidentDate).toLocaleDateString()]
    );

    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save(`${selectedReport}-report.pdf`);
  };

  const visitorColumns = [
    { name: "V_No", selector: (row) => row.vn0, sortable: true },
    { name: "First Name", selector: (row) => row.firstName, sortable: true },
    { name: "Last Name", selector: (row) => row.lastName, sortable: true },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    { name: "Inmate", selector: (row) => row.inmate, sortable: true },
    { name: "Relation", selector: (row) => row.relation, sortable: true },
    {
      name: "Visit Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
  ];

  const incidentColumns = [
    { name: "I_NO", selector: (row) => row.I_No, sortable: true },
    { name: "Inmate", selector: (row) => row.inmate, sortable: true },
    { name: "Reporter", selector: (row) => row.reporter, sortable: true },
    { name: "Type", selector: (row) => row.incidentType, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Reported On",
      selector: (row) => new Date(row.incidentDate).toLocaleDateString(),
      sortable: true,
    },
    { name: "Description", selector: (row) => row.description, sortable: true },
  ];

  return (
    <div className={`p-6 bg-white shadow-md rounded-md mt-12 ${isCollapsed ? "ml-16" : "ml-64"}`}>
      <div className={`bg-white shadow-md p-4 fixed top-14 z-20 flex justify-center items-center transition-all duration-300 ml-2 ${isCollapsed ? "left-16 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-17rem)]"}`}>
        <h3 className="text-2xl font-bold text-gray-800 text-center">Police Officer Reports</h3>
      </div>

      {/* Report Selection */}
      <div className="flex flex-wrap justify-center sm:justify-start space-x-4 mt-20 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${selectedReport === "visitors" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setSelectedReport("visitors")}
        >
          Visitor Reports
        </button>
        <button
          className={`px-4 py-2 rounded-md ${selectedReport === "incidents" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setSelectedReport("incidents")}
        >
          Incident Reports
        </button>
      </div>

      {/* Date Filters */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-3 mb-4">
        <input type="date" className="px-4 py-2 border rounded-md" onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" className="px-4 py-2 border rounded-md" onChange={(e) => setEndDate(e.target.value)} />

        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={selectedReport === "visitors" ? filterVisitors : () => filterIncidents()}
        >
          Generate {selectedReport === "visitors" ? "Visitor" : "Incident"} Report
        </button>
      </div>

      {/* Export Buttons */}
      {filteredData.length > 0 && (
        <div className="flex flex-wrap justify-center sm:justify-start space-x-4 mb-4">
          <CSVLink data={filteredData} filename={`${selectedReport}-report.csv`} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            Export as CSV
          </CSVLink>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" onClick={generatePDF}>
            Export as PDF
          </button>
        </div>
      )}

      {/* Data Table */}
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No data available for the selected criteria.</p>
      ) : (
        <DataTable
          columns={selectedReport === "visitors" ? visitorColumns : incidentColumns}
          data={filteredData}
          pagination
          responsive
        />
      )}
    </div>
  );
};

export default PoliceOfficerReports;
