"use client";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt, HiOutlineUserCircle, HiPlus, HiArrowRight } from "react-icons/hi";
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

export default function JobList() {
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
      <div className="flex justify-between items-center ">
  {/* Post Job Button */}
        <div className="flex  gap-4">
        <Link
          className="bg-emerald-700 text-white font-bold py-3 px-8 rounded flex items-center gap-2 hover:bg-green-700 transition duration-200"
          href="/addJob"
        >
          <HiPlus size={20} />
          Post Job
        </Link>

        <Link
          className="bg-slate-700 text-white font-bold py-3 px-8 rounded flex items-center gap-2 hover:bg-slate-700 transition duration-200"
          href={`/viewApplication?employerId=${session?.user?.id}`} // Pass employer ID as a query parameter
        >
          View Applications
        </Link>
      </div>

        {/* Profile Section */}
        <Link href="/dashboard1" className="flex items-center text-gray-700 text-bold hover:text-gray-900 transition duration-200">
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
                <p>We’re hiring</p>
                <h2 className="font-bold text-2xl underline">{j.jobTitle}</h2>
                <div className="mt-2">
                  <p><strong>Description:</strong> {j.jobDescription}</p>
                  <p><strong>Skills Required:</strong> {j.skillsRequired.join(', ')}</p>
                  <p><strong>Salary per Month:</strong> ${j.salaryPerMonth}</p>
                  <p><strong>Work Duration:</strong> {j.workDuration}</p>
                  <br></br>
                  {/* <p><strong>Posted by:</strong> {j.postedBy?.name || "Unknown"}</p> */}
                  
                  
                </div>
              </div>

              <div className="mt-4 flex justify-between w-full">

                {session?.user?.id === j.postedBy && (
                  <div className="flex gap-3 ">
                    
                      <RemoveBtn id={j._id} onJobDelete={fetchJobs} />
                      <Link href={`/editTopic/${j._id}`}>
                        <HiPencilAlt className="mt-2" size={24} />
                      </Link>
                  
                  </div>
                )}

                  {/* Show More Details Button inside each job post */}
                  <div className="mt-4 flex justify-end w-full">
                    <Link  className="text-blue-500 font-bold" href={`/employerJobDetail/${j._id}`} >
                      Show More Details
                    </Link>
                  </div>
                </div>
            </div>
          ))

      ) : (
        <p className="mt-5">No jobs available currently</p>
      )}
    </>
  );
}
