
import React, { useEffect, useState } from "react";
import axios from "axios";
import PoliceOfficerReports from "../PoliceOfficerReports.jsx";

const policeOfficerReportsPage = () => {
  const [visitors, setVisitors] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch Visitors
        const visitorsResponse = await axios.get("https://localhost:5000/api/visitors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (visitorsResponse.data.success) {
          setVisitors(visitorsResponse.data.visitors);
        }

        // Fetch Incidents
        const incidentsResponse = await axios.get("https://localhost:5000/api/incidents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (incidentsResponse.data.success) {
          setIncidents(incidentsResponse.data.incidents);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchData();
  }, []);

  return <PoliceOfficerReports visitors={visitors} incidents={incidents} />;
};

export default policeOfficerReportsPage;
