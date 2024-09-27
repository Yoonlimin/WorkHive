"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JobDetails({ id }) {
  const [job, setJob] = useState(null); // Initialize as null to avoid errors
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log("Fetching job with ID:", id);
        const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch job details");
        }

        const data = await res.json();
        console.log("Fetched job data: ", data);
        setJob(data.job); // Set the job details directly
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error loading job:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!job) {
    return <p>No job found</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="bg-slate-500 text-white py-2 px-4 rounded-t-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">Details</h1>
        
      </div>

      {/* Job Details Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
        {/* Company Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gray-300 rounded-full h-14 w-14"></div>
          <div>
            <p className="text-brown-600 text-xl font-bold">{job.companyName || "Company name not available"}</p>
            <p className="text-lg font-semibold">{job.jobTitle || "Job title not available"}</p>
            <p className="text-gray-500">${job.salaryPerMonth || "Salary not available"} / month</p>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Experience Level</p>
              <p className="font-bold">{job.experienceLevel || "Not specified"}</p>
            </div>

            <div>
              <p className="text-gray-500">Deadline</p>
              <p className="font-bold">{job.deadline ? new Date(job.deadline).toLocaleDateString() : "No deadline set"}</p>
            </div>

            <div className="col-span-2">
              <p className="text-gray-500">Skills required</p>
              <p className="font-bold">{job.skillsRequired ? job.skillsRequired.join(', ') : "No skills listed"}</p>
            </div>

            <div>
              <p className="text-gray-500">Duration</p>
              <p className="font-bold">{job.workDuration || "Not specified"}</p>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        {/* <div className="flex justify-end mt-4">
          <button className="bg-white border border-gray-500 text-gray-700 font-bold py-2 px-6 rounded">
            Apply
          </button>
        </div> */}
      </div>
    </div>
  );
}
