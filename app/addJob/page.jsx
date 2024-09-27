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
    const res = await fetch('http://localhost:3000/api/jobs', {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
    {/* Job Title */}

    <input
      onChange={(e) => setCompanyName(e.target.value)}
      value={companyName}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="text"
      placeholder="Company Name"
    />

    <input
      onChange={(e) => setJobTitle(e.target.value)}
      value={jobTitle}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="text"
      placeholder="Job Title"
    />
  
    {/* Job Description */}
    <input
      onChange={(e) => setJobDescription(e.target.value)}
      value={jobDescription}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="text"
      placeholder="Job Description"
    />
  
    {/* Skills Required */}
    <input
      onChange={(e) => setSkillsRequired(e.target.value.split(',').map(skill => skill.trim()))}
      value={skillsRequired.join(', ')}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="text"
      placeholder="Skills Required (YOu can add multiple skills by separating them with commas)"
    />
      
    {/* Salary Per Month */}
    <input
      onChange={(e) => setSalaryPerMonth(e.target.value)}
      value={salaryPerMonth}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="number"
      placeholder="Salary Per Month"
    />
  
    {/* Work Duration */}
    <input
      onChange={(e) => setWorkDuration(e.target.value)}
      value={workDuration}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="text"
      placeholder="Work Duration (e.g., 6 months)"
    />
  
    {/* Experience Level */}
    <select
      onChange={(e) => setExperienceLevel(e.target.value)}
      value={experienceLevel}
      className="border border-slate-500 px-4 py-2 w-full rounded"
    >
      <option value="">Select Experience Level</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Expert">Expert</option>
    </select>
  
    {/* Deadline */}
    <label className="font-semibold">Application Deadline</label>
    <input
      onChange={(e) => setDeadline(e.target.value)}
      value={deadline}
      className="border border-slate-500 px-4 py-2 w-full rounded"
      type="date"
    />
      
    {/* Submit Button */}
    <button
      type="submit"
      className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
    >
      Add Job
    </button>
  </form>
  

  );
  
}