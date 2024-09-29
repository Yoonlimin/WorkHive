"use client";
import { useEffect, useState } from "react";
import EditFreelancerProfile from "../../components/EditFreelancerProfile";
 
const getFreelancerByEmail = async (email) => {
  try {
    const decodedEmail = decodeURIComponent(email); // Ensure email is properly decoded
    const res = await fetch(`/api/Fregister?email=${decodedEmail}`, {
      cache: "no-store",
    });
 
    if (!res.ok) {
      throw new Error("Failed to fetch freelancer profile");
    }
 
    const data = await res.json();
    return data.freelancer; // Return the actual freelancer data
  } catch (error) {
    console.error("Error loading freelancer profile:", error);
    return null; // Return null if there's an error
  }
};
 
export default function EditProfile2({ params }) {
  const { id: email } = params; // Extract the email from the route parameters
  const decodedEmail = decodeURIComponent(email); // Decode the email to handle special characters
  const [freelancer, setFreelancer] = useState(null); // State to store freelancer data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
 
  useEffect(() => {
    const fetchFreelancerData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
 
      const freelancerData = await getFreelancerByEmail(decodedEmail); // Fetch the freelancer data
      if (freelancerData) {
        setFreelancer(freelancerData); // Set freelancer data
      } else {
        setError("Freelancer not found"); // Handle not found case
      }
 
      setLoading(false); // End loading
    };
 
    fetchFreelancerData(); // Call the fetch function
  }, [decodedEmail]); // Dependency array
 
  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>{error}</div>; // Display error message if there's an error
  }
 
  // Destructure freelancer details if freelancer is successfully fetched
  const {
    name,
    workType,
    skills,
    experienceLevel,
    professionalRole,
    address,
    phoneNumber,
  } = freelancer;
 
  return (
    <EditFreelancerProfile
      email={decodedEmail} // Passing decoded email
      name={name}
      workType={workType}
      skills={skills}
      experienceLevel={experienceLevel}
      professionalRole={professionalRole}
      address={address}
      phoneNumber={phoneNumber}
    />
  );
}
