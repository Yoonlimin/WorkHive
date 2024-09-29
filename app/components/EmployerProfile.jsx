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
    const res = await fetch(`/api/Eregister?email=${encodedEmail}`, {
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
    const res = await fetch(`/api/Eregister?email=${encodedEmail}`, {
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
    <div className="p-6 w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mt-5 mb-10">
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="w-16 h-16 relative">
            <Image
              src="/userProfile.png"
              alt="Profile Picture"
              className="rounded-full object-cover"
              layout="fill"
              priority
            />
          </div>

          {/* Employer's Name */}
          <h1 className="text-3xl font-bold text-navbar-color">{employer.name}</h1> {/* Match navbar color */}
        </div>

        {/* Edit Profile Button */}
        <button
          className="bg-emerald-800 hover:bg-emerald-900 p-2 rounded-full text-white flex items-center gap-2"
          onClick={() => router.push(`/editEProfile/${encodeURIComponent(employer.email)}`)}
        >
          <HiPencilAlt size={20} />
        </button>
      </div>

      {/* Employer Account Info */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-xl font-bold text-emerald-800 mb-2">Account and Password</h2>
        <p className="text-gray-600">{employer.email}</p>
        <p className="text-gray-600">*******</p>
      </div>

      {/* Company Name */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-xl font-bold text-emerald-800 mb-2">Company Name</h2>
        <p className="text-gray-600">{employer.companyName}</p>
      </div>

      {/* Company Details */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-xl font-bold text-emerald-800 mb-2">Company Details</h2>
        <p className="text-gray-600">{employer.companyDetails}</p>
      </div>

      {/* Company Contacts */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-xl font-bold text-emerald-800 mb-2">Company Contacts</h2>
        <p className="font-bold text-gray-700">Address</p>
        <p className="text-gray-600">{employer.address}</p>
        <p className="font-bold text-gray-700 mt-2">Phone</p>
        <p className="text-gray-600">{employer.phoneNumber}</p>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center">
          {/* Delete Button */}
          <button
            className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded transition duration-200"
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
            className="text-red-700 hover:bg-red-100 font-semibold py-2 px-4 rounded border border-red-700 transition duration-200"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}