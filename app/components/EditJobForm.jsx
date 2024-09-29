"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditJobForm({ id, companyName, jobTitle, jobDescription, skillsRequired, salaryPerMonth, workDuration, experienceLevel, deadline }) {
  
  // Set initial values for each job post field
  const [newCompanyName, setNewCompanyName] = useState(companyName);
  const [newJobTitle, setNewJobTitle] = useState(jobTitle);
  const [newJobDescription, setNewJobDescription] = useState(jobDescription);
  const [newSkillsRequired, setNewSkillsRequired] = useState(skillsRequired.join(", "));
  const [newSalaryPerMonth, setNewSalaryPerMonth] = useState(salaryPerMonth);
  const [newWorkDuration, setNewWorkDuration] = useState(workDuration);
  const [newExperienceLevel, setNewExperienceLevel] = useState(experienceLevel);
  const [newDeadline, setNewDeadline] = useState(deadline);
  
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newCompanyName,
          newJobTitle,
          newJobDescription,
          newSkillsRequired,
          newSalaryPerMonth,
          newWorkDuration,
          newExperienceLevel,
          newDeadline,
        }),
      });

      if (res.ok) {
        router.back(); // Navigate back after successful update
      } else {
        throw new Error("Failed to update the job post");
      }

      router.refresh(); // Optional: refresh the page to reflect changes immediately
    } catch (error) {
      console.error("Error updating job post:", error);
    }
     
    
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">Update Job Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Company Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Company Name"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            value={newJobTitle}
            onChange={(e) => setNewJobTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Job Title"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Job Description</label>
          <textarea
            value={newJobDescription}
            onChange={(e) => setNewJobDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Job Description"
            rows="4"
          />
        </div>

        {/* Skills Required */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Skills Required</label>
          <input
            type="text"
            value={newSkillsRequired}
            onChange={(e) => setNewSkillsRequired(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Skills Required (comma separated)"
          />
        </div>

        {/* Salary Per Month */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Salary Per Month</label>
          <input
            type="number"
            value={newSalaryPerMonth}
            onChange={(e) => setNewSalaryPerMonth(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Salary Per Month"
          />
        </div>

        {/* Work Duration */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Work Duration</label>
          <input
            type="text"
            value={newWorkDuration}
            onChange={(e) => setNewWorkDuration(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Work Duration (e.g., 6 months)"
          />
        </div>

        {/* Experience Level */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Experience Level</label>
          <select
            value={newExperienceLevel}
            onChange={(e) => setNewExperienceLevel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="">Select Experience Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        {/* Application Deadline */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Application Deadline</label>
          <input
            type="date"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded hover:bg-emerald-700 transition duration-200 mt-4"
        >
          Update Job Post
        </button>
      </form>
    </div>
  );
}