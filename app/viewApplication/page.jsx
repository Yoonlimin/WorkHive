"use client";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function ViewApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const employerId = searchParams.get('employerId'); // Get employerId from query parameter

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Fetch applications for jobs posted by the logged-in employer
        const res = await fetch(`/api/apply?employerId=${employerId}`);
        if (!res.ok) throw new Error("Failed to fetch applications");

        const data = await res.json();
        setApplications(data.applications);

        const applicationsWithJobTitle = await Promise.all(data.applications.map(async (app) => {
          // Fetch job details using `jobPostId`
          const jobRes = await fetch(`/api/jobs/${app.jobPostId}`, {
            cache: "no-store",
          });
          
          if (jobRes.ok) {
            const jobData = await jobRes.json();
            return { ...app, jobTitle: jobData.job.jobTitle }; // Add job title to application
          }
          
          return { ...app, jobTitle: "Unknown Job Title" }; // Fallback if job details cannot be fetched
        }));

        setApplications(applicationsWithJobTitle);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (employerId) {
      fetchApplications();
    }
  }, [employerId]);

  if (loading) return <p>Loading applications...</p>;
  if (!applications.length) return <p className="text-2xl">Still Haven’t Received Any Applications Yet....</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <h1 className="text-2xl font-bold mb-6 text-emerald-700">Job Applications</h1>
      
      {/* Applications List */}
      {applications.map((application) => (
        <div 
          key={application._id} 
          className="border border-gray-200 rounded-lg p-6 mb-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          {/* Freelancer Profile Section */}
          <div className="flex items-center gap-4 mb-4">
            {/* Profile Picture and View Profile Link */}
            <Link href={`/viewProfileF/?email=${application.email}`} className="flex items-center text-emerald-600 hover:text-emerald-800 transition duration-200">
              <div className="w-16 h-16 relative">
                <Image
                  src="/userProfile.png" // Replace with actual profile image URL
                  alt="Profile"
                  fill // Ensures the image covers the container
                  sizes="(max-width: 768px) 100vw, 64px" // Adjust as needed for responsive sizing
                  priority
                  className="rounded-full object-cover"
                />
              </div>
              <span className="ml-2 underline">View Profile</span>
            </Link>
          </div>

          {/* Application Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong className="text-gray-500">Position: </strong>{application.jobTitle}</p>
            <p><strong className="text-gray-500">Name: </strong>{application.name}</p>
            <p><strong className="text-gray-500">Email: </strong>{application.email}</p>
            <p><strong className="text-gray-500">Address: </strong>{application.address}</p>
          </div>

          {/* Resume and Cover Letter Links */}
          <div className="mt-4">
            <p className="flex items-center gap-2">
              <strong className="text-gray-500">Resume:</strong>
              <a 
                href={application.resume} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-red-600 hover:text-red-800 transition duration-200"
              >
                <HiOutlineDocumentText size={25} />
                <span>View Resume</span>
              </a>
            </p>

            <p className="flex items-center gap-2 mt-2">
              <strong className="text-gray-500">Cover Letter:</strong>
              <a 
                href={application.coverLetter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-red-600 hover:text-red-800 transition duration-200"
              >
                <HiOutlineDocumentText size={25} />
                <span>View Cover Letter</span>
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ViewApplicationsPage() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <ViewApplications />
    </Suspense>
  );
}
