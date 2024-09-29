"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function JobDetails({ id }) {
  const [job, setJob] = useState(null); // Initialize as null to avoid errors
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log("Fetching job with ID:", id);
        const res = await fetch(`/api/jobs/${id}`, {
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
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="bg-emerald-600 text-white py-3 px-4 rounded-t-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">Job Details</h1>
      </div>

      {/* Job Details Card */}
      <div className="bg-white shadow-md rounded-b-lg p-6 border border-gray-200 mt-4">
        {/* Company Info */}
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 relative">
            <Image
              src="/company.png" // Path to your image relative to the public directory
              alt="Profile Picture"
              className="rounded-full object-cover"
              layout="fill" // Ensures the image covers the container
              priority // Optional: improves loading speed for important images
            />
          </div>

          <div>
            <p className="text-emerald-700 text-xl font-bold">Company Name: {job.companyName || "Company name not available"}</p>
            <p className="text-lg font-semibold">Job Title: {job.jobTitle || "Job title not available"}</p>
            <p className="text-gray-500">{job.salaryPerMonth || "Salary not available"} THB / month</p>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="border border-gray-300 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Experience Level</p>
              <p className="font-bold text-gray-700">{job.experienceLevel || "Not specified"}</p>
            </div>

            <div>
              <p className="text-gray-500">Deadline</p>
              <p className="font-bold text-gray-700">{job.deadline ? new Date(job.deadline).toLocaleDateString() : "No deadline set"}</p>
            </div>

            <div className="col-span-2">
              <p className="text-gray-500">Skills Required</p>
              <p className="font-bold text-gray-700">{job.skillsRequired ? job.skillsRequired.join(', ') : "No skills listed"}</p>
            </div>

            <div>
              <p className="text-gray-500">Duration</p>
              <p className="font-bold text-gray-700">{job.workDuration || "Not specified"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}