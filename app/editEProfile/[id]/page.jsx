import EditEmployerProfile from "@/app/components/EditEmployerProfile";

// Function to fetch the employer details by email
const getEmployerByEmail = async (email) => {
  try {
    // Ensure email is properly decoded
    const decodedEmail = decodeURIComponent(email);
    
    const res = await fetch(`http://localhost:3000/api/Eregister?email=${decodedEmail}`, {
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

export default async function EditEProfile({ params }) {
  const { id: email } = params; // Extract the email from the route parameters

  // Decode the email to handle special characters
  const decodedEmail = decodeURIComponent(email);
  
  console.log("Fetching employer with email:", decodedEmail);

  // Fetch the employer data by email
  const employer = await getEmployerByEmail(decodedEmail);

  if (!employer) {
    // If employer is null or not found, render an error message or handle it as needed
    return <div>Employer not found</div>;
  }

  const { name, companyName, companyDetails, address, phoneNumber } = employer;

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
