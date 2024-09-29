"use client";
import { useEffect, useState } from "react";
import JobDetail from "@/app/components/jobDetails";
 
export default function EmployerJobDetails({ params }) {
  const { id } = params; // Extract the job ID from the params
  const [job, setJob] = useState(null); // State to store job data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
 
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`, {
          cache: "no-store", // Ensures fresh data is fetched
        });
 
        if (!res.ok) {
          throw new Error("Failed to fetch job");
        }
 
        const data = await res.json(); // Returns the job data
        console.log(data);
 
        setJob(data.job); // Set job data to state
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };
 
    fetchJobData(); // Call the fetch function
  }, [id]); // Run effect when id changes
 
  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  // Destructure job details if job is successfully fetched
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
    <JobDetail
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