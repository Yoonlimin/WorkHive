"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditJobForm({ id, companyName, jobTitle, jobDescription, skillsRequired, salaryPerMonth, workDuration, experienceLevel, deadline }) {
  
  // Set initial values for each job post field
  const [newComapnyName, setNewComapnyName] = useState(companyName);
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
      const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newComapnyName,
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Container for consistent width */}
      
        
    {/* Job Title */}
    <input
      onChange={(e) => setNewComapnyName(e.target.value)}
      value={newComapnyName}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="text"
      placeholder="Company Name"
    />
    
    <input
      onChange={(e) => setNewJobTitle(e.target.value)}
      value={newJobTitle}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="text"
      placeholder="Job Title"
    />

    {/* Job Description */}
    <input
      onChange={(e) => setNewJobDescription(e.target.value)}
      value={newJobDescription}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="text"
      placeholder="Job Description"
    />

    {/* Skills Required */}
    <input
      onChange={(e) => setNewSkillsRequired(e.target.value)}
      value={newSkillsRequired}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="text"
      placeholder="Skills Required (comma separated)"
    />

    {/* Salary Per Month */}
    <input
      onChange={(e) => setNewSalaryPerMonth(e.target.value)}
      value={newSalaryPerMonth}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="number"
      placeholder="Salary Per Month"
    />

    {/* Work Duration */}
    <input
      onChange={(e) => setNewWorkDuration(e.target.value)}
      value={newWorkDuration}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="text"
      placeholder="Work Duration (e.g., 6 months)"
    />

    {/* Experience Level */}
    <select
      onChange={(e) => setNewExperienceLevel(e.target.value)}
      value={newExperienceLevel}
      className="border border-slate-500 px-4 py-2 w-full rounded"
    >
      <option value="">Select Experience Level</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Expert">Expert</option>
    </select>

    {/* Deadline */}
    <input
      onChange={(e) => setNewDeadline(e.target.value)}
      value={newDeadline}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="date"
      placeholder="Application Deadline"
    />

    {/* Submit Button */}
    <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
      Update Job Post
    </button>
    
  </form>

  );
}
