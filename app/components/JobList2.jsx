"use client";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt, HiOutlineUserCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {useSession} from "next-auth/react";



// Function to fetch jobs
const getJobs = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/jobs/", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await res.json(); // Ensure you're correctly parsing the response
    return data;
  } catch (error) {
    console.log("Error loading jobs:", error);
    return { jobs: [] }; // Return empty array in case of error
  }
};

export default function JobList2() {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  const {data : session} = useSession();
  const fetchJobs = async () => {
        
        const data = await getJobs(); // Fetch jobs
        
        if (data && data.jobs) {
          setJobs(data.jobs);
          
          // Set jobs if the response is valid
        }
      };
  useEffect(() => {
    

    fetchJobs();
  }, []);
  


  return (
    <>
       <div className="flex justify-between items-center mb-6">
           {/* Add Job Button */}
           <p className="text-3xl  ">
             Browse Jobs that are most suitable for you!
           </p>

           {/* Profile Section */}
           <Link href="/dashboard2" className="flex items-center text-gray-700 text-bold hover:text-gray-900 transition duration-200">
              <HiOutlineUserCircle size={40} className="text-gray-700" /> My Profile
            </Link>
         </div>

         {/* Jobs List */}
         {jobs.length > 0 ? (
           jobs.map((j) => (
             <div
               key={j._id}
               className="p-4 border border-slate-300 my-3 flex flex-col gap-5 items-start"
             >
               <div>
                 <h2 className="font-bold text-2xl">{j.jobTitle}</h2>
                 <div className="mt-2">
                   <p><strong>Description:</strong> {j.jobDescription}</p>
                   <p><strong>Skills Required:</strong> {j.skillsRequired.join(', ')}</p>
                   <p><strong>Salary per Month:</strong> ${j.salaryPerMonth}</p>
                   <p><strong>Work Duration:</strong> {j.workDuration}</p>
                   <p><strong>Experience Level:</strong> {j.experienceLevel}</p>
                   <p><strong>Deadline:</strong> {new Date(j.deadline).toLocaleDateString()}</p>
                 </div>
               </div>

               {/* Buttons at the bottom of the job post */}
               <div className="flex justify-between w-full mt-4">
                 {/* Apply Button (left aligned) */}
                 <button
                    // onClick={() => router.push(`/applyJob/${j._id}`)} // Navigate to application form with job ID
                    className="bg-white border border-gray-500 text-gray-700 font-bold py-2 px-6 rounded"
                  >
                    Apply
                  </button>

                 {/* Show More Details Button (right aligned) */}
                 <Link className="mt-4 text-blue-500 font-bold" href={`/employerJobDetail/${j._id}`}>
                   Show More Details
                 </Link>
               </div>
             </div>
           ))
         ) : (
           <p>No jobs available currently</p>
         )}

    </>
  );
}
