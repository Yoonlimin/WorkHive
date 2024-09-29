"use client";
import { useEffect, useState } from "react";
import EditJobForm from "@/app/components/EditJobForm";
 
// Function to fetch job data by ID
const getJobById = async (id) => {
  try {
    const res = await fetch(`/api/jobs/${id}`, {
      cache: "no-store", // Ensures fresh data is fetched
    });
 
    if (!res.ok) {
      throw new Error("Failed to fetch job");
    }
 
    return res.json(); // Returns the job data
  } catch (error) {
    console.error("Error loading job:", error);
    return null; // Return null in case of error
  }
};
 
export default function EditJob({ params }) {
  const { id } = params; // Extract the job ID from the params
  const [job, setJob] = useState(null); // State to store job data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
 
  useEffect(() => {
    const fetchJobData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      const fetchedJob = await getJobById(id); // Fetch job data by ID
 
      if (fetchedJob) {
        setJob(fetchedJob.job); // Set job data to state
      } else {
        setError("Job not found"); // Handle not found case
      }
 
      setLoading(false); // End loading
    };
 
    fetchJobData(); // Call the fetch function
  }, [id]); // Dependency array
 
  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }
 
  // Destructure job fields if job is successfully fetched
  const {
    companyName,
    jobTitle,
    jobDescription,
    skillsRequired,
    salaryPerMonth,
    workDuration,
    experienceLevel,
    deadline,
  } = job;
 
  return (
<EditJobForm
      id={id}
      companyName={companyName}
      jobTitle={jobTitle}
      jobDescription={jobDescription}
      skillsRequired={skillsRequired}
      salaryPerMonth={salaryPerMonth}
      workDuration={workDuration}
      experienceLevel={experienceLevel}
      deadline={deadline}
    />
  );
}