"use client";
import { useState } from "react";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export default function AddJobPost() {
  // State variables for each input field
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [salaryPerMonth, setSalaryPerMonth] = useState(0);
  const [workDuration, setWorkDuration] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [deadline, setDeadline] = useState("");
  const session = useSession();

  const router= useRouter();

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    

    

    // Prepare job post data
    const jobData = {
      companyName,
      jobTitle,
      jobDescription,
      skillsRequired,
      salaryPerMonth,
      workDuration,
      experienceLevel,
      deadline,
    };
    
    const sessionToken = session?.user?.accessToken;

    // Send the job data to the backend API (replace with your API URL)
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(jobData)
      ,
      
    });
   

    if (res.ok) {
      // Handle success (e.g., reset the form or redirect)
      console.log('Job post created successfully');
      router.back();
    } else {
      // Handle error
      console.log('Failed to create job post');
    }
    router.refresh();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Your JobPost</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Company Name */}
        <div>
          <label className="block font-semibold mb-1">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Company Name"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block font-semibold mb-1">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Job Title"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block font-semibold mb-1">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Job Description"
          />
        </div>

        {/* Skills Required */}
        <div>
          <label className="block font-semibold mb-1">Skills Required</label>
          <input
            type="text"
            value={skillsRequired.join(", ")}
            onChange={(e) => setSkillsRequired(e.target.value.split(",").map(skill => skill.trim()))}
            className="w-full p-3 border rounded"
            placeholder="Skills Required (comma-separated)"
          />
        </div>

        {/* Salary Per Month */}
        <div>
          <label className="block font-semibold mb-1">Salary Per Month</label>
          <input
            type="number"
            value={salaryPerMonth}
            onChange={(e) => setSalaryPerMonth(e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Salary Per Month"
          />
        </div>

        {/* Work Duration */}
        <div>
          <label className="block font-semibold mb-1">Work Duration</label>
          <input
            type="text"
            value={workDuration}
            onChange={(e) => setWorkDuration(e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Work Duration (e.g., 6 months)"
          />
        </div>

        {/* Experience Level */}
        <div>
          <label className="block font-semibold mb-1">Experience Level</label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full p-3 border rounded"
          >
            <option value="">Select Experience Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        {/* Application Deadline */}
        <div>
          <label className="block font-semibold mb-1">Application Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded mt-4">
          Add Job
        </button>
      </form>
    </div>

  );
  
}