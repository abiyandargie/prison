// import React, { useState } from "react";
// import DataTable from "react-data-table-component";

// const SecurityStaffReports = ({ inmates }) => {
//   const [selectedReport, setSelectedReport] = useState("active"); // "active" or "released"
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   // Filter Active Inmates by Incarceration Date Range and status
//   const filterActiveInmates = () => {
//     const filtered = inmates.filter((inmate) => {
//       // Parse the incarceration date from the inmate record
//       const incDate = new Date(inmate.incarcerationDate);
//       return (
//         incDate >= new Date(startDate) &&
//         incDate <= new Date(endDate) &&
//         inmate.status.toLowerCase() === "active"
//       );
//     });
//     setFilteredData(filtered);
//   };

//   // Filter Released Inmates by Release Date Range and status
//   const filterReleasedInmates = () => {
//     const filtered = inmates.filter((inmate) => {
//       if (!inmate.releaseDate) return false; // Only consider inmates with a release date
//       const relDate = new Date(inmate.releaseDate);
//       return (
//         relDate >= new Date(startDate) &&
//         relDate <= new Date(endDate) &&
//         inmate.status.toLowerCase() === "released"
//       );
//     });
//     setFilteredData(filtered);
//   };

//   // Table Columns for Active Inmates Report
//   const activeColumns = [
//     { name: "Inmate ID", selector: (row) => row.inmateId, sortable: true },
//     { name: "Full Name", selector: (row) => row.fullName, sortable: true },
//     {
//       name: "Incarceration Date",
//       selector: (row) =>
//         new Date(row.incarcerationDate).toLocaleDateString(),
//       sortable: true,
//     },
//     { name: "Sentence", selector: (row) => row.sentence, sortable: true },
//     { name: "Status", selector: (row) => row.status, sortable: true },
//   ];

//   // Table Columns for Released Inmates Report
//   const releasedColumns = [
//     { name: "Inmate ID", selector: (row) => row.inmateId, sortable: true },
//     { name: "Full Name", selector: (row) => row.fullName, sortable: true },
//     {
//       name: "Release Date",
//       selector: (row) => new Date(row.releaseDate).toLocaleDateString(),
//       sortable: true,
//     },
//     {
//       name: "Release Reason",
//       selector: (row) => row.releaseReason || "N/A",
//       sortable: true,
//     },
//     { name: "Status", selector: (row) => row.status, sortable: true },
//   ];

//   return (
//     <div className="p-6 bg-white shadow-md rounded-md mt-12">
//       {/* Header */}
//       <h2 className="text-2xl font-bold text-center mb-4">
//         Inmate Reports
//       </h2>

//       {/* Report Selection */}
//       <div className="flex space-x-4 mb-4">
//         <button
//           className={`px-4 py-2 rounded-md ${
//             selectedReport === "active"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-300"
//           }`}
//           onClick={() => {
//             setSelectedReport("active");
//             setFilteredData([]);
//           }}
//         >
//           Active Inmates
//         </button>
//         <button
//           className={`px-4 py-2 rounded-md ${
//             selectedReport === "released"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-300"
//           }`}
//           onClick={() => {
//             setSelectedReport("released");
//             setFilteredData([]);
//           }}
//         >
//           Released Inmates
//         </button>
//       </div>

//       {/* Date Filters and Report Generation */}
//       <div className="flex items-center space-x-3 mb-4">
//         <input
//           type="date"
//           className="px-4 py-2 border rounded-md"
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//         <input
//           type="date"
//           className="px-4 py-2 border rounded-md"
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//         {selectedReport === "active" ? (
//           <button
//             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//             onClick={filterActiveInmates}
//           >
//             Generate Active Report
//           </button>
//         ) : (
//           <button
//             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//             onClick={filterReleasedInmates}
//           >
//             Generate Released Report
//           </button>
//         )}
//       </div>

//       {/* Report Table */}
//       <DataTable
//         columns={selectedReport === "active" ? activeColumns : releasedColumns}
//         data={filteredData}
//         pagination
//       />
//     </div>
//   );
// };

// export default SecurityStaffReports;
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PoliceOfficerReports = ({ visitors, incidents }) => {
  const [selectedReport, setSelectedReport] = useState("visitors");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Filter Visitors
  const filterVisitors = () => {
    const filtered = visitors.filter(visitor => {
      const visitDate = new Date(visitor.visitDate);
      return visitDate >= new Date(startDate) && visitDate <= new Date(endDate);
    });
    setFilteredData(filtered);
  };

  // Filter Incidents
  const filterIncidents = (status) => {
    const filtered = incidents.filter(incident => {
      const reportDate = new Date(incident.reportedDate);
      return (
        reportDate >= new Date(startDate) &&
        reportDate <= new Date(endDate) &&
        (!status || incident.status === status)
      );
    });
    setFilteredData(filtered);
  };

  // Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Police Officer Report", 14, 10);

    const tableColumn = selectedReport === "visitors"
      ? ["Visitor ID", "Inmate Name", "Visit Date"]
      : ["Incident ID", "Type", "Status", "Reported On"];

    const tableRows = filteredData.map(item => (
      selectedReport === "visitors"
        ? [item.visitorId, item.inmateName, new Date(item.visitDate).toLocaleDateString()]
        : [item.incidentId, item.type, item.status, new Date(item.reportedDate).toLocaleDateString()]
    ));

    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save(`${selectedReport}-report.pdf`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md mt-12">
      <h2 className="text-2xl font-bold text-center mb-4">Police Officer Reports</h2>

      {/* Report Selection */}
      <div className="flex space-x-4 mb-4">
        <button className={`px-4 py-2 rounded-md ${selectedReport === "visitors" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => { setSelectedReport("visitors"); setFilteredData([]); }}>
          Visitor Reports
        </button>
        <button className={`px-4 py-2 rounded-md ${selectedReport === "incidents" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => { setSelectedReport("incidents"); setFilteredData([]); }}>
          Incident Reports
        </button>
      </div>

      {/* Date Filters */}
      <div className="flex items-center space-x-3 mb-4">
        <input type="date" className="px-4 py-2 border rounded-md" onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" className="px-4 py-2 border rounded-md" onChange={(e) => setEndDate(e.target.value)} />
        {selectedReport === "visitors" ? (
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" onClick={filterVisitors}>
            Generate Visitor Report
          </button>
        ) : (
          <>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700" onClick={() => filterIncidents("Pending")}>
              Pending Incidents
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" onClick={() => filterIncidents("Resolved")}>
              Resolved Incidents
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" onClick={() => filterIncidents("Escalated")}>
              Escalated Incidents
            </button>
          </>
        )}
      </div>

      {/* PDF Export Button */}
      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 mb-4" onClick={generatePDF}>
        Download PDF
      </button>

      {/* Report Table */}
      <DataTable
        columns={selectedReport === "visitors"
          ? [{ name: "Visitor ID", selector: row => row.visitorId, sortable: true },
             { name: "Inmate", selector: row => row.inmateName, sortable: true },
             { name: "Visit Date", selector: row => new Date(row.visitDate).toLocaleDateString(), sortable: true }]
          : [{ name: "Incident ID", selector: row => row.incidentId, sortable: true },
             { name: "Type", selector: row => row.type, sortable: true },
             { name: "Status", selector: row => row.status, sortable: true },
             { name: "Reported On", selector: row => new Date(row.reportedDate).toLocaleDateString(), sortable: true }]
        }
        data={filteredData}
        pagination
      />
    </div>
  );
};

export default PoliceOfficerReports;
