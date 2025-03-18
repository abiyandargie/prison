
import React, { useEffect, useState } from "react";
import axios from "axios";
import SecurityStaffReports from "./SecurityStaffReports";

const InmateReportsPage = () => {
  const [inmates, setInmates] = useState([]);

  useEffect(() => {
    const fetchInmates = async () => {
      try {
        const response = await axios.get("https://localhost:5000/api/inmate", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setInmates(response.data.inmates);
        }
      } catch (error) {
        console.error("Error fetching inmates:", error);
      }
    };

    fetchInmates();
  }, []);

  return <SecurityStaffReports inmates={inmates} />;
};

export default InmateReportsPage;
