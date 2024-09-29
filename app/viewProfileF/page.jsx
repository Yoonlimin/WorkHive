"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from 'next/image';

export default function FreelancerProfile() {
  const [freelancer, setFreelancer] = useState(null);
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // Get email from query parameter

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/Fregister?email=${email}`);
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">Freelancer Profile</h2>

      {/* Profile Picture and Basic Info */}
      <div className="flex items-center gap-4 mb-6">
        {/* Profile Picture */}
        <div className="w-24 h-24 relative">
          <Image
            src="/userProfile.png" // Path to your image relative to the public directory
            alt="Profile Picture"
            className="rounded-full object-cover"
            layout="fill" // Ensures the image covers the container
            priority // Optional: improves loading speed for important images
          />
        </div>

        {/* Basic Details */}
        <div>
          <h3 className="text-xl font-bold">{freelancer.name}</h3>
          <p className="text-gray-500">{freelancer.professionalRole}</p>
        
        </div>
      </div>

      {/* Detailed Information */}
      <div className="grid gap-4">
        {/* Skills */}
        <div>
          <h4 className="text-lg font-bold mb-2">Skills</h4>
          <p>{freelancer.skills.join(', ')}</p>
        </div>

        {/* Experience Level */}
        <div>
          <h4 className="text-lg font-bold mb-2">Experience Level</h4>
          <p>{freelancer.experienceLevel}</p>
        </div>

        {/* Language Proficiency */}
        <div>
          <h4 className="text-lg font-bold mb-2">Language Proficiency</h4>
          <p>{freelancer.languageProficiency.join(', ')}</p>
        </div>

        {/* Address */}
        <div>
          <h4 className="text-lg font-bold mb-2">Address</h4>
          <p>{freelancer.address}</p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-2">Contact</h4>
          <p>Email: {freelancer.email}</p>
          <p>Phone: {freelancer.contactNumber}</p>
        </div>

        {/* Description/Bio */}
        {freelancer.bio && (
          <div>
            <h4 className="text-lg font-bold mb-2">About Me</h4>
            <p>{freelancer.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}

