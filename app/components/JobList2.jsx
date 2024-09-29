"use client";
import Link from "next/link";
import { HiOutlineUserCircle } from "react-icons/hi";
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

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading jobs:", error);
    return { jobs: [] };
  }
};

export default function JobList2() {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();

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
        {/* Title and Applications Button */}
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-bold text-emerald-700">
            Browse Jobs that are Most Suitable for You!
          </p>

          <div className="w-full flex justify-start">
            <Link
              className="bg-gray-800 text-white font-semibold py-3 px-8 rounded flex items-center gap-2 hover:bg-gray-700 transition duration-200 shadow-md"
              href={`/myApplication?appliedBy=${session?.user?.id}`}
            >
              My Applications
            </Link>
          </div>
        </div>

        {/* Profile Section */}
        <Link
          href="/dashboard2"
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

              {/* Show More Details Button */}
              <div className="mt-4 flex justify-between items-center">
                <Link
                  href={`/jobDetail/${j._id}`}
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