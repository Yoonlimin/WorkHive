"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function JobDetail({ id }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch job details");
        }

        const data = await res.json();
        setJob(data.job);
        setLoading(false);
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
    <div className="container mx-auto px-6 py-8">
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
              src="/company.png"
              alt="Company Logo"
              className="rounded-full object-cover"
              layout="fill"
              priority
            />
          </div>

          <div>
          <Link
              href={`/companyProfile/?employerId=${job.postedBy}`}
              className="text-blue-500 underline"
            >
              <p className="text-brown-600 text-xl font-bold">
                Company Name: {job.companyName || "Company name not available"}
              </p>
            </Link>
            <p className="text-lg font-semibold text-gray-700">Job Title: {job.jobTitle || "Job title not available"}</p>
            <p className="text-gray-600">{job.salaryPerMonth || "Salary not available"} THB / month</p>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="border border-gray-300 rounded-lg p-4">
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

        {/* Apply Button */}
        <div className="flex justify-end mt-4">
          <Link href={`/applyJob/${job._id}`}>
            <button
              className="bg-emerald-600 text-white font-bold py-2 px-6 rounded hover:bg-emerald-700 transition duration-200"
            >
              Apply
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}