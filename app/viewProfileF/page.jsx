"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from 'next/image';

function FProfile() {
  const [freelancer, setFreelancer] = useState(null);
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // Get email from query parameter

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const res = await fetch(`/api/Fregister?email=${email}`);
        if (!res.ok) throw new Error("Failed to fetch freelancer");

        const data = await res.json();
        setFreelancer(data.freelancer);
      } catch (error) {
        console.error("Error fetching freelancer:", error);
      }
    };

    if (email) {
      fetchFreelancer();
    }
  }, [email]);

  if (!freelancer) {
    return <p>Loading profile...</p>;
  }

  return  (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-navbar-color mb-6">Freelancer Profile</h2>
      {/* Profile Picture and Basic Info */}
      <div className="flex items-center gap-4 mb-6">
        {/* Profile Picture */}
        <div className="w-24 h-24 relative">
          <Image
            src="/userProfile.png" // Path to your image relative to the public directory
            alt="Profile Picture"
            className="rounded-full object-cover"
            fill // Ensures the image covers the container
            priority // Optional: improves loading speed for important images
          />
        </div>

        {/* Basic Details */}
        <div>
          <h3 className="text-xl font-bold text-gray-800">{freelancer.name}</h3>
          <p className="text-gray-600">{freelancer.professionalRole}</p>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="grid gap-4">
        {/* Skills */}
        <div>
          <h4 className="text-lg font-bold text-emerald-600 mb-2">Skills</h4>
          <p className="text-gray-700">{freelancer.skills.join(', ')}</p>
        </div>

        {/* Experience Level */}
        <div>
          <h4 className="text-lg font-bold text-emerald-600 mb-2">Experience Level</h4>
          <p className="text-gray-700">{freelancer.experienceLevel}</p>
        </div>

        {/* Address */}
        <div>
          <h4 className="text-lg font-bold text-emerald-600 mb-2">Address</h4>
          <p className="text-gray-700">{freelancer.address}</p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold text-emerald-600 mb-2">Contact</h4>
          <p className="text-gray-700">Email: {freelancer.email}</p>
          <p className="text-gray-700">Phone: {freelancer.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default function FProfilePage() {
  return (
    <Suspense fallback={<p>Loading profile...</p>}>
      <FProfile />
    </Suspense>
  );
}
