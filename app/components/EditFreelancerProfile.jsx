"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditFreelancerProfile({ email, name, workType, skills, experienceLevel, professionalRole, address, phoneNumber }) {
  // State variables to hold form data
  const [newName, setNewName] = useState(name);
  const [newWorkType, setNewWorkType] = useState(workType);
  const [newSkills, setNewSkills] = useState(skills);
  const [newExperienceLevel, setNewExperienceLevel] = useState(experienceLevel);
  const [newProfessionalRole, setNewProfessionalRole] = useState(professionalRole);
  const [newAddress, setNewAddress] = useState(address);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);

  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Decode the email to handle any special characters
    const decodedEmail = decodeURIComponent(email);

    try {
      // Update freelancer data using email as identifier
      const res = await fetch(`http://localhost:3000/api/Fregister/${decodedEmail}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newWorkType,
          newSkills,
          newExperienceLevel,
          newProfessionalRole,
          newAddress,
          newPhoneNumber,
        }),
      });

      if (res.ok) {
        console.log("Freelancer updated successfully");
        router.back(); // Navigate back after a successful update
      } else {
        throw new Error("Failed to update the freelancer profile");
      }

      router.refresh();
    } catch (error) {
      console.error("Error updating freelancer:", error);
    }
   
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Freelancer Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Work Type */}
        <div>
          <label className="block font-semibold mb-1">Work Type</label>
          <input
            type="text"
            value={newWorkType}
            onChange={(e) => setNewWorkType(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block font-semibold mb-1">Skills</label>
          <textarea
            value={newSkills}
            onChange={(e) => setNewSkills(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Experience Level */}
        <div>
          <label className="block font-semibold mb-1">Experience Level</label>
          <select
            type="text"
            value={newExperienceLevel}
            onChange={(e) => setNewExperienceLevel(e.target.value)}
            className="w-full p-3 border rounded"
            >
              <option value="">Select Experience Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        {/* Professional Role */}
        <div>
          <label className="block font-semibold mb-1">Professional Role</label>
          <input
            type="text"
            value={newProfessionalRole}
            onChange={(e) => setNewProfessionalRole(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold mb-1">Address</label>
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            type="text"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
}
