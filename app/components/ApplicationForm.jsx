"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ApplyJob({ jobPostId }) { // Pass jobPostId as a prop when rendering
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(""); 
  const [coverLetter, setCoverLetter] = useState(""); 
  
  const [appliedBy, setAppliedBy] = useState(""); 

  // Set `appliedBy` using session data
  useEffect(() => {
    if (session && session.user) {
      setAppliedBy(session.user.id); // Assuming session contains `id` of the freelancer
      setName(session.user.name); 
      setEmail(session.user.email);
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          address,
          resume,
          coverLetter,
          jobPostId, // Include jobPostId
          appliedBy, // Include the ID of the freelancer
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      console.log("Application submitted successfully");
      router.push("/freelancer"); // Redirect or provide feedback on success
    } catch (error) {
      console.error("Error submitting application:", error);
    }
    
  };


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">Job Application</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            readOnly
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            readOnly
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Resume */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Resume (as URL or text)</label>
          <input
            type="text"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Cover Letter (as URL or text)</label>
          <input
            type="text"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded hover:bg-emerald-700 transition duration-200 mt-4"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}