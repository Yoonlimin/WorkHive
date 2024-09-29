"use client";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt, HiOutlineUserCircle, HiPlus } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// Function to fetch jobs
const getJobs = async () => {
  try {
    const res = await fetch("/api/jobs/", {
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
  const { data: session } = useSession();

  // Fetch jobs when the component mounts
  const fetchJobs = async () => {
    const data = await getJobs();
    if (data && data.jobs) {
      setJobs(data.jobs);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Post Job and View Applications Buttons */}
        <div className="flex gap-4">
          <Link
            className="bg-emerald-600 text-white font-semibold py-3 px-6 rounded flex items-center gap-2 hover:bg-emerald-500 transition-all duration-200 shadow-md"
            href="/addJob"
          >
            <HiPlus size={20} />
            Post Job
          </Link>

          <Link
            className="bg-gray-800 text-white font-semibold py-3 px-6 rounded flex items-center gap-2 hover:bg-gray-700 transition-all duration-200 shadow-md"
            href={`/viewApplication?employerId=${session?.user?.id}`} // Pass employer ID as a query parameter
          >
            View Applications
          </Link>
        </div>

        {/* Profile Section */}
        <Link
          href="/dashboard1"
          className="flex items-center text-gray-700 font-semibold hover:text-gray-900 transition-all duration-200"
        >
          <HiOutlineUserCircle size={40} className="text-gray-700" />
          <span className="ml-2">My Profile</span>
        </Link>
      </div>

      {/* Jobs List */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((j) => (
            <div
              key={j._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="h-48 overflow-hidden">
                <p className="text-sm text-gray-500">We’re hiring</p>
                <h2 className="font-bold text-xl text-emerald-700 mt-2">
                  {j.jobTitle}
                </h2>
                <div className="mt-4 text-sm">
                  <p className="text-gray-700">
                    <strong>Description:</strong> {j.jobDescription}
                  </p>
                  <p className="text-gray-700">
                    <strong>Skills Required:</strong> {j.skillsRequired.join(', ')}
                  </p>
                  <p className="text-gray-700">
                    <strong>Salary per Month:</strong> ${j.salaryPerMonth}
                  </p>
                  <p className="text-gray-700">
                    <strong>Work Duration:</strong> {j.workDuration}
                  </p>
                </div>
              </div>

              {/* Action Buttons for Job */}
              <div className="mt-4 flex justify-between items-center">
                {session?.user?.id === j.postedBy && (
                  <div className="flex gap-3">
                    <RemoveBtn id={j._id} onJobDelete={fetchJobs} />
                    <Link
                      href={`/editTopic/${j._id}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <HiPencilAlt size={20} />
                    </Link>
                  </div>
                )}

                {/* Show More Details Button */}
                <Link
                  href={`employerJobDetail/${j._id}`}
                  className="text-emerald-600 font-bold hover:text-emerald-800 transition-colors duration-200"
                >
                  More Details 
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-gray-600 text-center">No jobs available currently</p>
      )}
    </div>
  );
}