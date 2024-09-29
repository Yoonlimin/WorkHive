"use client";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const freelancerId = searchParams.get('appliedBy'); // Get employerId from query paramet
  console.log("Freelancer ID from URL:", freelancerId); // Get employerId from query parameter

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Fetch applications for jobs posted by the logged-in employer
        const res = await fetch(`http://localhost:3000/api/apply?appliedBy=${freelancerId}`);
        if (!res.ok) throw new Error("Failed to fetch applications");

      

        const data = await res.json();
        console.log("API Response:", data); 

        // Fetch each job's title and company details using `jobPostId`
        const applicationsWithJobDetails = await Promise.all(
          data.applications.map(async (app) => {
            const jobRes = await fetch(`http://localhost:3000/api/jobs/${app.jobPostId}`, {
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
    <div>
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      {applications.map((application) => (
       
        <div key={application._id} className="border p-4 rounded-lg my-2">
          {/* Freelancer Profile Section */}
          
          
          {/* Job Details Section */}
          <p><strong>Company: </strong> {application.companyName}</p>
          <p><strong>Position: </strong>{application.jobTitle}</p>
          
            {/* <Link href={`/companyProfile/${application.companyId}`} className="text-blue-500 underline">
              {application.companyName}
            </Link> */}
          
          <p><strong>Name:</strong> {application.name}</p>
          <p><strong>Email:</strong> {application.email}</p>
          <p><strong>Address:</strong> {application.address}</p>

          {/* Resume and Cover Letter Links */}
          <p className="flex items-center gap-2">
            <strong>Resume:</strong>
            <a href={application.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <HiOutlineDocumentText size={25} className="text-red-600" />
              <span>View Resume</span>
            </a>
          </p>
          <p className="flex items-center gap-2">
            <strong>Cover Letter:</strong>
            <a href={application.coverLetter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <HiOutlineDocumentText size={25} className="text-red-600" />
              <span>View Cover Letter</span>
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}
