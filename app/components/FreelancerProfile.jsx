"use client";

import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from 'next/image';

// Fetch freelancer profile
const getFreelancerProfile = async (email) => {
  try {
    // Encode the email before making the fetch call
    const encodedEmail = encodeURIComponent(email);
    const res = await fetch(`http://localhost:3000/api/Fregister?email=${encodedEmail}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch freelancer profile");
    }

    const data = await res.json();
    return data.freelancer;
  } catch (error) {
    console.error("Error loading freelancer profile:", error);
    return null;
  }
};

const deleteFreelancerAccount = async (email) => {
  const confirmed = confirm("Are you sure you want to delete your account?");
  if (confirmed) {
    const encodedEmail = encodeURIComponent(email);
    const res = await fetch(`http://localhost:3000/api/Fregister?email=${encodedEmail}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw Error("Failed to delete freelancer account");
    }

    console.log("Freelancer deleted successfully");
    return true;
  }
};

export default function FreelancerProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const [freelancer, setFreelancer] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      // Decode the session email before using it
      const decodedEmail = decodeURIComponent(session.user.email);
      getFreelancerProfile(decodedEmail).then((data) => {
        setFreelancer(data);
      });
    }
  }, [session?.user?.email]);

  if (!freelancer) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="p-4 mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mt-5 mb-10">
      <div className="flex items-center gap-4">
        {/* Profile Picture Placeholder */}
        <div className="w-16 h-16 relative">
          <Image
            src="/userProfile.png" // Path to your image relative to the public directory
            alt="Profile Picture"
            className="rounded-full object-cover"
            layout="fill" // Ensures the image covers the container
            priority // Optional: improves loading speed for important images
          />
        </div>
        
        {/* Freelancer's Name */}
        <h1 className="text-3xl font-bold">{freelancer.name}</h1>
      </div>

        <button
          className="bg-slate-500 p-2 rounded-full text-white flex items-center gap-3"
          onClick={() => router.push(`/editProfile2/${encodeURIComponent(freelancer.email)}`)}
        >
          <HiPencilAlt size={24} />
        </button>
      </div>

      {/* Freelancer Account Info */}
      <div className="bg-white rounded-lg p-6 shadow mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Account and Password</h2>
            <p className="text-gray-500">{freelancer.email}</p>
            <p className="text-gray-500">*******</p>
          </div>
        </div>
      </div>

      {/* Freelancer Professional Info */}
      <div className="bg-white rounded-lg p-6 shadow mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Professional Information</h2>
            <p><strong>Job Field:</strong> {freelancer.workType}</p>
            <p><strong>Skills:</strong> {freelancer.skills.join(', ')}</p>
            <p><strong>Experience Level:</strong> {freelancer.experienceLevel}</p>
            <p><strong>Hourly Rate:</strong> ${freelancer.salaryRate}</p>
          </div>
        </div>
      </div>

      {/* Freelancer Contacts */}
      <div className="bg-white rounded-lg p-6 shadow mb-6">
        <h2 className="text-xl font-bold mb-2">Contact Information</h2>
        <p className="font-bold">Address</p>
        <p>{freelancer.address}</p>
        <p className="font-bold">Phone</p>
        <p>{freelancer.phoneNumber}</p>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="flex justify-between">
          {/* Delete Button */}
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
              const isDeleted = await deleteFreelancerAccount(freelancer.email);
              if (isDeleted) {
                signOut({ redirect: false }).then(() => {
                  router.push('/'); // Redirect to '/' after signing out
                });
              }
            }}
          >
            Delete Account
          </button>

          {/* Logout Button */}
          <button
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push('/'); // Redirect to '/' after signing out
              });
            }}
            className="text-red-600 font-bold py-2 px-4 rounded border border-red-600"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
