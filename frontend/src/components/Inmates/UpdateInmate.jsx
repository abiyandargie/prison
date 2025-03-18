import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CS
import { TiArrowBack } from "react-icons/ti";

const UpdateInmate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming you're passing the inmate ID in the URL params
  console.log(id)
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    age: "",
    motherName: "",
    gender: "",
    birthRegion: "",
    birthZone: "",
    birthWereda: "",
    birthKebele: "",
    currentRegion: "",
    currentZone: "",
    currentWereda: "",
    currentKebele: "",
    degreeLevel: "",
    work: "",
    nationality: "",
    religion: "",
    maritalStatus: "",
    height: "",
    hairType: "",
    face: "",
    foreHead: "",
    nose: "",
    eyeColor: "",
    teeth: "",
    lip: "",
    ear: "",
    specialSymbol: "",
    contactName: "",
    contactRegion: "",
    contactZone: "",
    contactWereda: "",
    contactKebele: "",
    phoneNumber: "",
    registrarWorkerName: "",
    caseType: "",
    paroleDate: "",
    releaseReason: "",
    releasedDate: ""
  });

  // Separate state for file uploads
  const [signature, setSignature] = useState(null);

  // Fetch the inmate details to populate the form
  useEffect(() => {
    const fetchInmateData = async () => {
      try {
        const response = await axiosInstance.get(`/inmates/get-inmate/${id}`);
        const inmateData = response.data.inmate;
        setFormData({
          ...inmateData,
          birthDate: inmateData.birthDate.split('T')[0], // Format date to match input format
          paroleDate: inmateData.paroleDate?.split('T')[0], // Format date if exists
          releasedDate: inmateData.releasedDate?.split('T')[0] // Format date if exists
        });
      } catch (error) {
        console.error("Error fetching inmate data:", error);
        toast.error("Failed to fetch inmate data.");
      }
    };
    fetchInmateData();
  }, [id]);

  // Handle changes for both text and file inputs.
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "signature") {
      setSignature(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission with multipart/form-data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (signature) {
      data.append("signature", signature);
    }

    try {
      const response = await axiosInstance.put(
        `/inmates/update-inmate/${id}`,
        data,
      );

      if (response.data) {
        navigate("/securityStaff-dashboard/inmates");
        toast.success("Inmate updated successfully!");
      } else {
        alert("Failed to update inmate.");
      }
    } catch (error) {
      console.error("Error updating inmate:", error);
      alert(
        error.response?.data?.error ||
          "An error occurred while updating the inmate."
      );
    }
  };
  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
       <TiArrowBack size={50} onClick={()=>navigate(-1)} className="cursor-pointer"/>
      <h2 className="text-3xl font-bold mb-6 text-center">Update Inmate</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              placeholder="Enter full name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              placeholder="Enter age"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              placeholder="Enter mother's name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Birth Place */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Birth Place</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Region</label>
              <input
                type="text"
                name="birthRegion"
                value={formData.birthRegion}
                placeholder="Enter birth region"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zone</label>
              <input
                type="text"
                name="birthZone"
                value={formData.birthZone}
                placeholder="Enter birth zone"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Wereda</label>
              <input
                type="text"
                name="birthWereda"
                value={formData.birthWereda}
                placeholder="Enter birth wereda"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kebele</label>
              <input
                type="text"
                name="birthKebele"
                value={formData.birthKebele}
                placeholder="Enter birth kebele"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Current Living Place */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Current Living Place</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Region</label>
              <input
                type="text"
                name="currentRegion"
                value={formData.currentRegion}
                placeholder="Enter current region"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zone</label>
              <input
                type="text"
                name="currentZone"
                value={formData.currentZone}
                placeholder="Enter current zone"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Wereda</label>
              <input
                type="text"
                name="currentWereda"
                value={formData.currentWereda}
                placeholder="Enter current wereda"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kebele</label>
              <input
                type="text"
                name="currentKebele"
                value={formData.currentKebele}
                placeholder="Enter current kebele"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Education & Work */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Degree Level</label>
            <input
              type="text"
              name="degreeLevel"
              value={formData.degreeLevel}
              placeholder="Enter degree level"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Work</label>
            <input
              type="text"
              name="work"
              value={formData.work}
              placeholder="Enter occupation"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Additional Personal Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              placeholder="Enter nationality"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Religion</label>
            <input
              type="text"
              name="religion"
              value={formData.religion}
              placeholder="Enter religion"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select marital status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              placeholder="Enter height"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Physical Characteristics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Hair Type</label>
            <input
              type="text"
              name="hairType"
              value={formData.hairType}
              placeholder="Enter hair type"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Face</label>
            <input
              type="text"
              name="face"
              value={formData.face}
              placeholder="Describe face features"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Forehead</label>
            <input
              type="text"
              name="foreHead"
              value={formData.foreHead}
              placeholder="Describe forehead"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nose</label>
            <input
              type="text"
              name="nose"
              value={formData.nose}
              placeholder="Describe nose"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Eye Color</label>
            <input
              type="text"
              name="eyeColor"
              value={formData.eyeColor}
              placeholder="Enter eye color"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teeth</label>
            <input
              type="text"
              name="teeth"
              value={formData.teeth}
              placeholder="Describe teeth"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lip</label>
            <input
              type="text"
              name="lip"
              value={formData.lip}
              placeholder="Describe lip"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ear</label>
            <input
              type="text"
              name="ear"
              value={formData.ear}
              placeholder="Describe ear"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Special Symbol</label>
            <input
              type="text"
              name="specialSymbol"
              value={formData.specialSymbol}
              placeholder="Enter special symbol"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Name</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                placeholder="Enter contact name"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Region</label>
              <input
                type="text"
                name="contactRegion"
                value={formData.contactRegion}
                placeholder="Enter contact region"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Zone</label>
              <input
                type="text"
                name="contactZone"
                value={formData.contactZone}
                placeholder="Enter contact zone"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Wereda</label>
              <input
                type="text"
                name="contactWereda"
                value={formData.contactWereda}
                placeholder="Enter contact wereda"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Kebele</label>
              <input
                type="text"
                name="contactKebele"
                placeholder="Enter contact kebele"
                value={formData.contactKebele}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="Enter phone number"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Registrar Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Registrar Worker Name</label>
            <input
              type="text"
              name="registrarWorkerName"
              value={formData.registrarWorkerName}
              placeholder="Enter registrar worker name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Registrar Worker Signature</label>
            <input
              type="file"
              name="signature"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Case & Parole Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Case Type</label>
            <input
              type="text"
              name="caseType"
              value={formData.caseType}
              placeholder="Enter case type"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Parole Date</label>
            <input
              type="date"
              name="paroleDate"
              value={formData.paroleDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Release Reason</label>
            <textarea
              name="releaseReason"
              placeholder="Enter release reason"
              value={formData.releaseReason}
              onChange={handleChange}
              rows="3"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Released Date</label>
            <input
              type="date"
              name="releasedDate"
              value={formData.releasedDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Inmate
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInmate;
