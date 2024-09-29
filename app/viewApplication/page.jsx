"use client";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ViewApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const employerId = searchParams.get('employerId'); // Get employerId from query parameter

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Fetch applications for jobs posted by the logged-in employer
        const res = await fetch(`http://localhost:3000/api/apply?employerId=${employerId}`);
        if (!res.ok) throw new Error("Failed to fetch applications");

        const data = await res.json();
        setApplications(data.applications);

        const applicationsWithJobTitle = await Promise.all(data.applications.map(async (app) => {
          // Fetch job details using `jobPostId`
          const jobRes = await fetch(`http://localhost:3000/api/jobs/${app.jobPostId}`, {
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
   <div>
     <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
     {applications.map((application) => (
       <div key={application._id} className="border p-4 rounded-lg my-2">

        
         {/* Freelancer Profile Section */}
         <div className="flex items-center gap-4 mb-2">
           {/* Profile Picture Placeholder */}
           <Link href={`/viewProfileF/?email=${application.email}`} className="text-slate-500 underline">
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
               View Profile
             </Link>

           {/* Freelancer's Name */}
          
         </div>
         <p><strong>Position: </strong>{application.jobTitle}</p>
         <p><strong>Name:</strong> {application.name}</p>

         <p><strong>Email:</strong> {application.email}</p>
         <p><strong>Address:</strong> {application.address}</p>
         
         <p className="flex items-center gap-2">
           <strong>Resume:</strong>
           <a href={application.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
             <HiOutlineDocumentText size={25} className="text-red-600" />
             {/* Add a label beside the icon */}
             <span>View Resume</span>
           </a>
         </p>

         <p className="flex items-center gap-2">
           <strong>Cover Letter:</strong>
           <a href={application.coverLetter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
             <HiOutlineDocumentText size={25} className="text-red-600" />
             {/* Add a label beside the icon */}
             <span>View Cover Letter</span>
           </a>
         </p>
       </div>
     ))}
   </div>
 );
}