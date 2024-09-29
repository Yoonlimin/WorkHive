"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditEmployerProfile({ email, name, companyName, companyDetails, address, phoneNumber }) {
  // State variables to hold form data
  const [newName, setNewName] = useState(name);
  const [newCompanyName, setNewCompanyName] = useState(companyName);
  const [newCompanyDetails, setNewCompanyDetails] = useState(companyDetails);
  const [newAddress, setNewAddress] = useState(address);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);

  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Decode the email to handle any special characters
    const decodedEmail = decodeURIComponent(email);

    try {
      // Update employer data using email as identifier
      const res = await fetch(`/api/Eregister/${decodedEmail}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newCompanyName,
          newCompanyDetails,
          newAddress,
          newPhoneNumber,
        }),
      });

      if (res.ok) {
        console.log("Employer updated successfully");
        router.back(); // Navigate back after a successful update
      } else {
        throw new Error("Failed to update the employer profile");
      }

      router.refresh();
    } catch (error) {
      console.error("Error updating employer:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Company Details */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Company Details</label>
          <textarea
            value={newCompanyDetails}
            onChange={(e) => setNewCompanyDetails(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            rows="4"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Address</label>
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded hover:bg-emerald-700 transition duration-200 mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}