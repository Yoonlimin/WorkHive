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
      const res = await fetch("http://localhost:3000/api/apply", {
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
      <h2 className="text-2xl font-semibold mb-4">Job Application</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded"
            readOnly
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
            readOnly
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Resume (as URL or text)</label>
          <input
            type="text"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Cover Letter (as URL or text)</label>
          <input
            type="text"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded mt-4"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
