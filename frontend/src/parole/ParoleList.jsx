import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // Axios utility
import { useSelector } from "react-redux"; // To access sidebar state

const behaviorRules = [
  { id: 1, label: "Following prison rules", options: [1, 3, 5, 10] },
  { id: 2, label: "Attending rehabilitation programs", options: [1, 3, 5, 10] },
  { id: 3, label: "Helping other inmates", options: [1, 3, 5, 10] },
  { id: 4, label: "Addiction", options: [1, 3, 5, 10] },
  { id: 5, label: "No Fighting or violence", options: [1, 3, 5, 10] },
  { id: 6, label: "Not Attempting escape", options: [1, 3, 5, 10] },
];

const InmateBehavior = () => {
  const { inmateId } = useParams(); // Getting inmate ID from URL params
  const [inmateDetails, setInmateDetails] = useState(null);  
  const [selectedBehaviors, setSelectedBehaviors] = useState({}); // To track selected behavior scores
  const [paroleScore, setParoleScore] = useState(null); // To track the parole score after submission
  const [loadingInmates, setLoadingInmates] = useState(false); // Loading state for inmate details
  const [trackedDays, setTrackedDays] = useState(0); // To store the number of days tracked

  // Sidebar collapse state from Redux
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  // Fetch inmate details based on the inmate ID
  const fetchInmateById = async () => {
    setLoadingInmates(true);
    try {
      const response = await axiosInstance.get(`/inmates/get-inmate/${inmateId}`);
      if (response.data?.inmate) {
        const inmate = response.data.inmate;
        setInmateDetails({
          _id: inmate._id,
          inmate_name: inmate.fullName || "N/A",
          age: inmate.age || "N/A",
          gender: inmate.gender || "N/A",
          sentence: inmate.releaseReason || "N/A", // Total sentence (in years)
        });
      } else {
        console.error("Inmate data not found", response);
      }
    } catch (error) {
      console.error("Error fetching inmate:", error);
      alert(error.response?.data?.error || "Failed to fetch inmate data.");
    } finally {
      setLoadingInmates(false);
    }
  };

  useEffect(() => {
    if (inmateId) {
      fetchInmateById(); // Fetch inmate details when component is mounted or inmateId changes
    }
  }, [inmateId]);

  // Handle the change in behavior selection (radio button click)
  const handleRadioChange = (ruleId, value) => {
    setSelectedBehaviors((prev) => ({
      ...prev,
      [ruleId]: value,
    }));
  };

  // Function to calculate tracked days from behavior logs
  const calculateTrackedDays = (behaviorLogs) => {
    if (!behaviorLogs || behaviorLogs.length === 0) return 0;

    // Extract all dates from behavior logs
    const dates = behaviorLogs.map(log => new Date(log.date).toDateString());

    // Remove duplicate dates to get the unique tracked days
    const uniqueDates = [...new Set(dates)];
    return uniqueDates.length;
  };

  // Fetch behavior logs and calculate tracked days
  const fetchBehaviorLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      const response = await axiosInstance.get(`/parole-tracking/${inmateId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.behaviorLogs) {
        const trackedDaysCount = calculateTrackedDays(response.data.behaviorLogs);
        setTrackedDays(trackedDaysCount);
      }

    } catch (error) {
      console.error("Error fetching behavior logs:", error);
      alert("Failed to fetch behavior logs.");
    }
  };

  useEffect(() => {
    fetchBehaviorLogs(); // Fetch behavior logs and calculate tracked days
  }, [inmateId]);

  // Function to calculate parole eligibility
  const checkParoleEligibility = () => {
    if (!inmateDetails?.sentence || !selectedBehaviors) return null;

    const totalSentenceYears = parseInt(inmateDetails.sentence); // Assuming sentence is in years
    const pointsEarnedThisYear = Object.values(selectedBehaviors).reduce((acc, points) => acc + points, 0);
    const totalPossiblePoints = behaviorRules.length * 10; // 10 points max per behavior rule

    // 2/3 sentence completion check
    const twoThirdsSentence = totalSentenceYears * 2 / 3;
    const paroleEligible = pointsEarnedThisYear >= totalPossiblePoints * 0.75 && totalSentenceYears >= twoThirdsSentence;

    return paroleEligible;
  };

  // Submit behavior log
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(selectedBehaviors).length === 0) {
      alert("Please select at least one behavior.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      const behaviorLogs = Object.entries(selectedBehaviors).map(([id, points]) => {
        const rule = behaviorRules.find((rule) => rule.id === parseInt(id));
        return {
          behaviorType: rule.label,
          points,
          date: new Date(),
        };
      });

      console.log("Submitting behavior logs:", behaviorLogs);

      // Send behavior logs to the server
      const addBehaviorResponse = await axiosInstance.post(
        `/parole-tracking/add/${inmateId}`, 
        { behaviorLogs } // Corrected payload structure
      );

      if (addBehaviorResponse.status === 200) {
        alert("Behavior logged successfully!");
      } else {
        alert("Failed to log behavior.");
      }

      // Fetch updated parole score and eligibility
      const scoreResponse = await axiosInstance.get(`/parole-tracking/${inmateId}`);
      console.log("Score response:", scoreResponse);

      if (scoreResponse.data.success) {
        setParoleScore(scoreResponse.data.paroleScore);
      }

      const eligibility = checkParoleEligibility();
      if (eligibility) {
        alert("The inmate is eligible for parole based on the conditions.");
      } else {
        alert("The inmate is not eligible for parole yet.");
      }
    } catch (error) {
      console.error("Error submitting behavior log:", error);
      alert("Error submitting behavior log. Please try again.");
    }
  };

  return (
    <div className={`max-w-4xl mx-auto mt-10 bg-white p-8 pt-3 rounded-md shadow-md ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <h2 className="text-2xl font-bold mb-6 text-center">Inmate Behavior Tracking</h2>

      {loadingInmates ? (
        <div className="text-center text-gray-600">Loading inmate details...</div>
      ) : inmateDetails ? (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Inmate Details</h3>
          <div className="flex flex-wrap sm:space-x-8 text-center">
            <div className="flex-1 mb-4 sm:mb-0">
              <p><strong>Name:</strong> {inmateDetails.inmate_name}</p>
              <p><strong>Age:</strong> {inmateDetails.age}</p>
            </div>
            <div className="flex-1 mb-4 sm:mb-0">
              <p><strong>Gender:</strong> {inmateDetails.gender}</p>
              <p><strong>Sentence:</strong> {inmateDetails.sentence} years</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">Inmate not found.</div>
      )}

      {/* Display tracked days */}
      <div className="text-center text-lg font-semibold mt-4">
        <p><strong>Tracked Days:</strong> {trackedDays}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-3 text-left">Rule</th>
                {behaviorRules[0].options.map((opt) => (
                  <th key={opt} className="border border-gray-300 p-3 text-center">{opt} pts</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {behaviorRules.map((rule, index) => (
                <tr key={rule.id} className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                  <td className="border border-gray-300 p-3 font-semibold">{rule.label}</td>
                  {rule.options.map((opt) => (
                    <td key={opt} className="border border-gray-300 p-3 text-center">
                      <input
                        type="radio"
                        name={`rule-${rule.id}`}
                        value={opt}
                        checked={selectedBehaviors[rule.id] === opt}
                        onChange={(e) => handleRadioChange(rule.id, parseInt(e.target.value))}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button 
          type="submit" 
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
        >
          Submit Behavior Log
        </button>
      </form>

      {paroleScore !== null && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md text-center">
          <h3 className="text-xl font-semibold">Parole Eligibility: {paroleScore}%</h3>
          {paroleScore >= 75 ? (
            <p className="text-green-600 font-bold">Eligible for Parole</p>
          ) : (
            <p className="text-red-600 font-bold">Not Eligible for Parole</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InmateBehavior;
