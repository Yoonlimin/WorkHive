"use client";

import { useEffect, useState } from "react";
import EditEmployerProfile from "../../components/EditEmployerProfile";

// Function to fetch the employer details by email
const getEmployerByEmail = async (email) => {
  try {
    // Ensure email is properly decoded
    const decodedEmail = decodeURIComponent(email);
    
    const res = await fetch(`/api/Eregister?email=${decodedEmail}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch employer profile");
    }

    const data = await res.json();
    return data.employer; // Return the actual employer data
  } catch (error) {
    console.error("Error loading employer profile:", error);
    return null; // Return null if there's an error
  }
};

export default function EditEProfile({ params }) {
  const { id: email } = params; // Extract the email from the route parameters
  const decodedEmail = decodeURIComponent(email); // Decode the email to handle special characters
  const [employer, setEmployer] = useState(null); // State to store employer data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    const fetchEmployerData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      const employerData = await getEmployerByEmail(decodedEmail); // Fetch the employer data
      if (employerData) {
        setEmployer(employerData); // Set employer data
      } else {
        setError("Employer not found"); // Handle not found case
      }

      setLoading(false); // End loading
    };

    fetchEmployerData(); // Call the fetch function
  }, [decodedEmail]); // Dependency array

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an error
  }

  // Destructure employer details if employer is successfully fetched
  const {
    name,
    companyName,
    companyDetails,
    address,
    phoneNumber,
  } = employer;

  return (
    <EditEmployerProfile
      email={decodedEmail} // Passing decoded email
      name={name}
      companyName={companyName}
      companyDetails={companyDetails}
      address={address}
      phoneNumber={phoneNumber}
    />
  );
}
