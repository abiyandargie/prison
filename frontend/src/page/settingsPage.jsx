import React, { useState } from "react";
import { FiSave } from "react-icons/fi";

const InputField = ({ label, id, type, value, onChange, placeholder, required, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-lg font-semibold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 w-full rounded-md"
      placeholder={placeholder}
      required={required}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const SettingsPage = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSave = () => {
    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // Logic for saving changes can go here (e.g., API call)
    alert("Settings saved!");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file)); // Display image preview
    }
  };

  return (
    <div className="settings-page p-4 md:p-6 lg:p-8 mt-24 md:mt-24 ml-0 md:ml-64 transition-all duration-300">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Email Field */}
        <div className="col-span-1">
          <InputField
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            error={emailError}
          />
        </div>

        {/* Old Password Field */}
        <div className="col-span-1">
          <InputField
            label="Old Password"
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter your old password"
            required
          />
        </div>

        {/* New Password Field */}
        <div className="col-span-1">
          <InputField
            label="New Password"
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="col-span-1">
          <InputField
            label="Confirm New Password"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            required
          />
        </div>

        {/* Display Name Field */}
        <div className="col-span-1">
          <InputField
            label="Display Name"
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your display name"
            required
          />
        </div>

        {/* Notifications Toggle */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <div className="mb-4">
            <label htmlFor="notifications" className="block text-lg font-semibold mb-2">
              Notifications
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifications"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="mr-2"
              />
              <span className="text-lg">{notificationsEnabled ? "Enabled" : "Disabled"}</span>
            </div>
          </div>
        </div>

        {/* Profile Picture Upload */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <div className="mb-4">
            <label htmlFor="profilePicture" className="block text-lg font-semibold mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="border border-gray-300 p-2 w-full rounded-md"
            />
            {profilePicture && <img src={profilePicture} alt="Profile Preview" className="mt-4 w-24 h-24 rounded-full object-cover" />}
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm col-span-1">{error}</p>}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white flex items-center gap-2 p-3 rounded-md hover:bg-blue-600 transition-colors mt-6"
      >
        <FiSave /> Save Changes
      </button>
    </div>
  );
};

export default SettingsPage;
