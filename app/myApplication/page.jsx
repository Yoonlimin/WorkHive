"use client";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const freelancerId = searchParams.get('appliedBy');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Fetch applications for jobs applied by the freelancer
        const res = await fetch(`/api/apply?appliedBy=${freelancerId}`);
        if (!res.ok) throw new Error("Failed to fetch applications");

        const data = await res.json();
        
        // Fetch job details using `jobPostId`
        const applicationsWithJobDetails = await Promise.all(
          data.applications.map(async (app) => {
            const jobRes = await fetch(`/api/jobs/${app.jobPostId}`, {
              cache: "no-store",
            });

            if (jobRes.ok) {
              const jobData = await jobRes.json();
              const job = jobData.job;
              return { 
                ...app, 
                jobTitle: job.jobTitle, 
                companyName: job.companyName, 
              };
            }

            return { ...app, jobTitle: "Unknown Job Title", companyName: "Unknown Company" };
          })
        );

        setApplications(applicationsWithJobDetails);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (freelancerId) {
      fetchApplications();
    }
  }, [freelancerId]);

  if (loading) return <p>Loading applications...</p>;
  if (!applications.length) return <p className="text-2xl">You Haven’t Applied Any Applications Yet....</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6">My Applications</h1>
      
      {applications.map((application) => (
        <div key={application._id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-4 hover:shadow-lg transition-shadow duration-200">
          {/* Job and Company Information */}
           <p className="text-xl font-bold text-gray-800 mb-2 underline">{application.jobTitle}</p>
          <p className="text-lg text-gray-700 mb-1">
            <strong>Company:</strong> {application.companyName}
          </p>
          <p className="text-lg text-gray-700 mb-1">
            <strong>Name:</strong> {application.name}
          </p>
          <p className="text-lg text-gray-700 mb-1">
            <strong>Email:</strong> {application.email}
          </p>
          <p className="text-lg text-gray-700 mb-1">
            <strong>Address:</strong> {application.address}
          </p>

          {/* Resume and Cover Letter Links */}
          <div className="mt-4">
            <p className="flex items-center gap-2 mb-2">
              <strong>Resume:</strong>
              <a href={application.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline">
                <HiOutlineDocumentText size={25} className="text-red-600" />
                <span>View Resume</span>
              </a>
            </p>
            <p className="flex items-center gap-2">
              <strong>Cover Letter:</strong>
              <a href={application.coverLetter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline">
                <HiOutlineDocumentText size={25} className="text-red-600" />
                <span>View Cover Letter</span>
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}