"use client";

import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from 'next/image';

// Fetch employer profile
const getEmployerProfile = async (email) => {
  try {
    const encodedEmail = encodeURIComponent(email);
    const res = await fetch(`http://localhost:3000/api/Eregister?email=${encodedEmail}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch employer profile");
    }

    const data = await res.json();
    return data.employer;
  } catch (error) {
    console.error("Error loading employer profile:", error);
    return null;
  }
};

const deleteEmployerAccount = async (email) => {
  const confirmed = confirm("Are you sure you want to delete this account?");
  if (confirmed) {
    const encodedEmail = encodeURIComponent(email);
    const res = await fetch(`http://localhost:3000/api/Eregister?email=${encodedEmail}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete employer account");
    }

    console.log("Employer deleted successfully");
    return true;
  }
};

export default function EmployerProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const [employer, setEmployer] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      getEmployerProfile(session.user.email).then((data) => {
        setEmployer(data);
      });
    }
  }, [session?.user?.email]);

  if (!employer) {
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
        <h1 className="text-3xl font-bold">{employer.name}</h1>
      </div>

        <button
          className="bg-slate-500 p-2 rounded-full text-white flex items-center gap-3"
          onClick={() => router.push(`/editEProfile/${encodeURIComponent(employer.email)}`)}
        >
          <HiPencilAlt size={24} />
        </button>
      </div>

      {/* Employer Account Info */}
      <div className="bg-white rounded-lg p-6 shadow mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Account and Password</h2>
            <p className="text-gray-500">{employer.email}</p>
            <p className="text-gray-500">*******</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Company Name</h2>
            <p>{employer.companyName}</p>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="bg-white rounded-lg p-6 shadow mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Company Details</h2>
            <p>{employer.companyDetails}</p>
          </div>
        </div>
      </div>

      {/* Company Contacts */}
      <div className="bg-white rounded-lg p-6 shadow mb-6">
        <h2 className="text-xl font-bold mb-2">Company contacts</h2>
        <p className="font-bold">Address</p>
        <p>{employer.address}</p>
        <p className="font-bold">Phone</p>
        <p>{employer.phoneNumber}</p>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="flex justify-between">
          {/* Delete Button */}
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
              const isDeleted = await deleteEmployerAccount(employer.email);
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
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}
