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
      <div className=" flex items-center">
          {/* Add Job Button */}
          <Link
            className="mt-3 bg-slate-600 text-white font-bold py-5 px-20 rounded mt-20"
            href="/addJob"
          >
            Post Job
          </Link>

          {/* Profile Section */}
          <div className="ml-auto mt-3 flex items-center gap-3">
            <HiOutlineUserCircle size={40} className="text-gray-700" />
            <Link href="/dashboard" className="text-gray-700 font-bold">
              My Profile
            </Link>
          </div>
        </div>

        <p className=" mt-5 text-3xl  mt-2 ">Job List</p>

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

              {session?.user?.id === j.postedBy && (
                <div className="flex gap-2 ">
                <RemoveBtn id={j._id} onJobDelete={fetchJobs} />
                <Link href={`/editTopic/${j._id}`}>
                  <HiPencilAlt size={24} />
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
          ))

      ) : (
        <p className="mt-5">No jobs available currently</p>
      )}
    </>
  );
}
